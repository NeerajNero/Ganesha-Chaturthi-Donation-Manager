import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

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

    const title = formData.get('title') as string
    const amount = parseInt(formData.get('amount') as string)
    const type = formData.get('type') as string
    const notes = formData.get('notes') as string | null
    const file = formData.get('receipt') as File | null

    if (!title || !amount || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let receiptUrl: string | undefined = undefined

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `expense-${Date.now()}`
      const result = await uploadToCloudinary(buffer, filename, 'expense-receipts')
      receiptUrl = result.secure_url
    }

    const expense = await db.expense.create({
      data: {
        title,
        amount,
        type,
        notes,
        receiptUrl,
        userId: user?.id,
      },
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error('[POST_EXPENSE]', error)
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam && !isNaN(+limitParam) ? parseInt(limitParam) : undefined

    const expenses = await db.expense.findMany({
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(expenses)
  } catch (error) {
    console.error('[GET_EXPENSES]', error)
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}
