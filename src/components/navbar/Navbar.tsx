'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react' // ✅

const baseNavItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Donations', href: '/donations' },
  { name: 'Expenses', href: '/expenses' },
]

const protectedNavItems = [
  { name: 'Add Donation', href: '/addDonation' },
  { name: 'Add Expense', href: '/addExpense' },
]

export function FestivalNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { data: session } = useSession() // ✅ get session

  const navItems = [...baseNavItems, ...(session?.user ? protectedNavItems : [])]

  return (
    <nav className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
          🕉️ <span className="hidden sm:inline">Ganesh Chaturthi Donation Manager</span>
        </Link>

        <div className="sm:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden sm:flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium px-3 py-1.5 rounded hover:bg-white hover:text-red-600 transition-all',
                pathname === item.href && 'bg-white text-orange-600 font-bold'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div className="sm:hidden px-4 pb-3 space-y-2 bg-gradient-to-b from-orange-500 to-red-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block text-white px-3 py-2 rounded-md hover:bg-white hover:text-orange-700 transition',
                pathname === item.href && 'bg-white text-red-600 font-bold'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
