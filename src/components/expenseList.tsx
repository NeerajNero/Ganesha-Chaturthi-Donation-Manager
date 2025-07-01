'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

type Expense = {
  id: string
  title: string
  amount: number
  type: string
  notes?: string | null
  receiptUrl?: string | null
  date: string
}

export default function ExpenseList({ limit }: { limit?: number }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const query = limit ? `?limit=${limit}` : ''
      const res = await fetch(`/api/expenses${query}`)
      const data = await res.json()

      if (Array.isArray(data)) {
        setExpenses(data)
      } else {
        console.error('Unexpected data format:', data)
        setExpenses([])
      }
    } catch (err) {
      console.error('Failed to load expenses:', err)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }

  fetchExpenses()
}, [limit])


  if (loading) return <p>Loading expenses...</p>
  if (expenses.length === 0) return <p>No expenses yet.</p>

  return (
    <div className="grid gap-4">
      {expenses.map((expense) => (
        <Card key={expense.id}>
          <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1 flex-1">
              <p><strong>Title:</strong> {expense.title}</p>
              <p><strong>Amount:</strong> ₹{expense.amount}</p>
              <p><strong>Type:</strong> {expense.type}</p>
              {expense.notes && <p><strong>Notes:</strong> {expense.notes}</p>}
              <p className="text-xs text-muted-foreground">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            {expense.receiptUrl && (
              <div className="w-[120px] flex-shrink-0 space-y-1 text-center">
                <img
                  src={expense.receiptUrl}
                  alt="Receipt"
                  className="h-24 w-auto mx-auto rounded border shadow-sm"
                />
                <a
                  href={expense.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View Receipt
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
