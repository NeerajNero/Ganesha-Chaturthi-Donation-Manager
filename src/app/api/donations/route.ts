import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { NextResponse } from 'next/server'
import { sendTelegramMessage, sendTelegramImage } from '@/lib/telegram'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    const formData = await req.formData()

    const donorName = formData.get('donorName')?.toString()
    const amount = parseInt(formData.get('amount') as string)
    const mode = formData.get('mode')?.toString()
    const notes = formData.get('notes')?.toString()
    const image = formData.get('image') as File | null

    if (!donorName || !amount || !mode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let imageUrl: string | undefined = undefined

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const filename = `donation-${Date.now()}`
      const uploaded = await uploadToCloudinary(buffer, filename, 'donation-receipts')
      imageUrl = uploaded.secure_url
    }

    const donation = await db.donation.create({
      data: {
        donorName,
        amount,
        mode,
        notes,
        image: imageUrl,
        userId: user?.id,
      },
    })

    if (mode.toLowerCase() === 'upi' && imageUrl) {
  await sendTelegramImage({
    imageUrl,
    caption: `🎉 *New Donation*\n💰 ₹${amount} by *${donorName}*\n📝 Mode: _${mode}_`,
  })
} else {
  await sendTelegramMessage(
    `🎉 *New Donation*\n💰 ₹${amount} by *${donorName}*\n📝 Mode: _${mode}_`
  )
}

    return NextResponse.json(donation, { status: 201 })
  } catch (err) {
    console.error('[DONATION_POST_ERROR]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam && !isNaN(+limitParam) ? parseInt(limitParam) : undefined

    const donations = await db.donation.findMany({
      orderBy: { date: 'desc' },
      take: limit, // ✅ apply limit
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error('[GET_DONATIONS]', error)
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
  }
}