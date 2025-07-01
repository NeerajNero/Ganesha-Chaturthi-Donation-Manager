import ExpenseList from "@/components/expenseList"
export default function ExpensesPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
      <ExpenseList />
    </div>
  )
}
