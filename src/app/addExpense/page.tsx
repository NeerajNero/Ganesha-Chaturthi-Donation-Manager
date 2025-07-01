import { AddExpenseForm } from '@/components/addExpenseForm'

export default function AddExpensePage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <AddExpenseForm />
    </div>
  )
}
