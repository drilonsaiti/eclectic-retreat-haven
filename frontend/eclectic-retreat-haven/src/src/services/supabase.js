
import { createClient } from '@supabase/supabase-js'


export  const supabaseUrl = 'https://tfuqnepvvdeiwssgclxl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmdXFuZXB2dmRlaXdzc2djbHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NzM5OTEsImV4cCI6MjAxOTM0OTk5MX0.TmjQ9kHqDr3JG3EFv4we2xA6vr611KceSM6BqKWi9y8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;