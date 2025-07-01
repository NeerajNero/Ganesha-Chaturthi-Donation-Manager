// app/add-donation/page.tsx
import { AddDonationForm } from '@/components/addDonationForm'

export default function AddDonationPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Donation</h1>
      <AddDonationForm />
    </div>
  )
}
