'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  donorName: z.string().min(1, 'Donor name is required'),
  amount: z.coerce.number().min(1, 'Amount must be at least ₹1'),
  mode: z.enum(['cash', 'upi', 'cheque']),
  notes: z.string().optional(),
  image: z.custom<FileList>().optional().refine((file) => file?.[0] instanceof File || file === undefined, {
    message: 'Invalid file',
  }),
})

type DonationFormValues = z.infer<typeof formSchema>

export function AddDonationForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: '',
      amount: 0,
      mode: 'cash',
      notes: '',
      image: undefined as unknown as FileList, // Use undefined to allow no file initially
    },
  })

  const onSubmit = async (values: DonationFormValues) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('donorName', values.donorName)
      formData.append('amount', values.amount.toString())
      formData.append('mode', values.mode)
      formData.append('notes', values.notes || '')
      if (values.image?.[0]) {
        formData.append('image', values.image[0])
      }

      const res = await fetch('/api/donations', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success(`Donation from ${data.donorName} added!`)
      form.reset()
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <FormField
          control={form.control}
          name="donorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Neeraj Sharma" {...field} />
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
              <FormLabel>Amount (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded px-2 py-1">
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="cheque">Cheque</option>
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
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any extra details..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt Image (optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Donation'}
        </Button>
      </form>
    </Form>
  )
}
