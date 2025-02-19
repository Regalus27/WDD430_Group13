import { sql } from '@vercel/postgres';
import { User } from "./definitions";

export async function fetchUsers() {
 
  try {
    const data = await sql<User>`
      SELECT *
      FROM users;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export const isAuth = () => {
  return false
}

// Convert form price data to database format
export const convertToActualPriceInCents = (price: number) => {
  return Math.round(price * 100);
};

export const formatPrice = (price: number | string) => {
  // Requires item prices to be stored in cents.

  // if price is string it will convert to number
  price = +(price)

  if (price < 0) {
      price *= -1;
  }

  return (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
