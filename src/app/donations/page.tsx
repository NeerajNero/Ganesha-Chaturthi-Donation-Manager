import DonationList from "@/components/donationList"
export default function DonationsPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Donations</h2>
      <DonationList />
    </div>
  )
}
