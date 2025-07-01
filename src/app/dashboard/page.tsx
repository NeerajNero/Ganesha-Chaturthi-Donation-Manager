'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import DonationList from '@/components/donationList'
import ExpenseList from '@/components/expenseList'

export default function DashboardPage() {
  const [stats, setStats] = useState<{ totalDonations: number, totalExpenses: number, balance: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Failed to load stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-lg font-bold text-green-700">₹{stats?.totalDonations}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-lg font-bold text-red-600">₹{stats?.totalExpenses}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-lg font-bold text-blue-600">₹{stats?.balance}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Recent Donations</h2>
        <DonationList limit={5} />
        <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
        <ExpenseList limit={5} />
      </div>
    </div>
  )
}
