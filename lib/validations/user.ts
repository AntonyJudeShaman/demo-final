import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
  id: z.string(), // Define the id property schema here
  email: z.string().email()
})
