'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  amount: z.coerce.number().min(1, { message: 'Amount must be greater than 0' }),
  type: z.enum(['major', 'minor', 'internal'], { required_error: 'Type is required' }),
  notes: z.string().optional(),
  receipt: z.custom<FileList>().optional().refine((file) => file instanceof FileList || file === undefined, {
    message: 'Invalid file',
  })
})

type FormData = z.infer<typeof formSchema>

export function AddExpenseForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      amount: 0,
      type: undefined,
      notes: '',
      receipt: undefined as unknown as FileList,    // Use undefined to allow no file initially
    },
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('amount', data.amount.toString())
    formData.append('type', data.type)
    if (data.notes) formData.append('notes', data.notes)
    if (data.receipt?.[0]) formData.append('receipt', data.receipt[0])

    const res = await fetch('/api/expenses', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      toast.success('Expense added!')
      form.reset()
    } else {
      toast.error('Failed to add expense')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded p-2">
                  <option value="">Select Type</option>
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="internal">Internal</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receipt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Add Expense'}
        </Button>
      </form>
    </Form>
  )
}
