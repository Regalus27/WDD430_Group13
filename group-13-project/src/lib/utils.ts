import { sql } from '@vercel/postgres';
import { User } from "./definitions";

export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  };


export default function generatePagination (currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

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

