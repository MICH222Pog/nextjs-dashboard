'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CustomerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email format.' }),
});

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  console.log('Received formData:', Object.fromEntries(formData.entries())); // Log form data

  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  console.log('Validation result:', validatedFields); // Log validation results

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  console.log('Connecting to database...');
  try {
    await sql`SELECT 1`;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    return { message: 'Database Connection Error.' };
  }

  const { name, email } = validatedFields.data;
  const imageUrl = `/customers/lee-robinson.png`;
  const totalInvoices = 0;
  const totalPending = 0;
  const totalPaid = 0;

  console.log('Inserting into database:', { name, email, imageUrl });

  try {
    await sql`
    INSERT INTO customers (name, email, image_url) 
    VALUES (${name}, ${email}, ${imageUrl});
`;

    console.log('Customer successfully inserted');
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}


export async function deleteCustomer(id: string): Promise<void> {
    try {
      await sql`DELETE FROM customers WHERE id = ${id}`;
      revalidatePath('/dashboard/customers');
    } catch (error) {
      console.error('Database Error:', error);
    }
  }
  

  


