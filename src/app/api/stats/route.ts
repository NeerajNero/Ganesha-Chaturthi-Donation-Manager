import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [donationTotal, expenseTotal] = await Promise.all([
      db.donation.aggregate({
        _sum: { amount: true },
      }),
      db.expense.aggregate({
        _sum: { amount: true },
      }),
    ])

    const totalDonations = donationTotal._sum.amount || 0
    const totalExpenses = expenseTotal._sum.amount || 0
    const balance = totalDonations - totalExpenses

    return NextResponse.json({
      totalDonations,
      totalExpenses,
      balance,
    })
  } catch (error) {
    console.error('[GET_STATS]', error)
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}
