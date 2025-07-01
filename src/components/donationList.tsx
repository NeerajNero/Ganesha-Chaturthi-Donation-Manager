'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

type Donation = {
  id: string
  donorName?: string | null
  amount: number
  mode: string
  notes?: string | null
  image?: string | null
  date: string
}

export default function DonationList({ limit }: { limit?: number }) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchDonations = async () => {
    setLoading(true)
    try {
      const query = limit ? `?limit=${limit}` : ''
      const res = await fetch(`/api/donations${query}`)
      const data = await res.json()

      if (Array.isArray(data)) {
        setDonations(data)
      } else {
        console.error('Unexpected data format:', data)
        setDonations([])
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setDonations([])
    } finally {
      setLoading(false)
    }
  }

  fetchDonations()
}, [limit])


  if (loading) return <p>Loading donations...</p>
  if (donations.length === 0) return <p>No donations yet.</p>

  return (
    <div className="grid gap-4">
      {donations.map((donation) => (
        <Card key={donation.id}>
          <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
            {/* Left: Donation Info */}
            <div className="space-y-1 flex-1">
              <p><strong>Donor:</strong> {donation.donorName || 'Anonymous'}</p>
              <p><strong>Amount:</strong> ₹{donation.amount}</p>
              <p><strong>Mode:</strong> {donation.mode}</p>
              {donation.notes && <p><strong>Notes:</strong> {donation.notes}</p>}
              <p className="text-xs text-muted-foreground">
                {new Date(donation.date).toLocaleDateString()}
              </p>
            </div>

            {/* Right: Image & Link */}
            {donation.image && (
              <div className="w-[120px] flex-shrink-0 space-y-1 text-center">
                {donation.image && (
                  <Image
                    src={donation.image}
                    alt="Receipt"
                    width={200}
                    height={200}
                    className="h-24 w-auto mx-auto rounded border shadow-sm"
                  />
                )}
                <a
                  href={donation.image}
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
