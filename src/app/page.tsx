// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-100 to-red-100 px-4">
      <div className="text-center max-w-xl space-y-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-700 tracking-tight">
          🙏 Ganesh Chaturthi Donation Portal
        </h1>
        <p className="text-md sm:text-lg text-orange-900">
          Celebrate with transparency. Track all your donations and expenses during this holy occasion with ease and trust. 
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <Button variant="default" className="bg-orange-600 hover:bg-orange-700 text-white">
              🧾 View Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground pt-4 italic">
          Wishing you a joyful, organized and transparent Ganesh Utsav 🐘
        </p>
      </div>
    </main>
  )
}
