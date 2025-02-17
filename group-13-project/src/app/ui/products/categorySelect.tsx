'use client';

import { fetchProductCategories } from "@/lib/data";

// Populate select options based on categories
export default function CreateCategorySelect({
    defaultCategory,
} : {
    defaultCategory: string,
}) {
    const categories: string[] = fetchProductCategories();
    const createOptions = () => {
        const options = [];
        for (let i = 0; i < categories.length; i++) {
            options.push(<option key={i} value={categories[i]}>{categories[i]}</option>); 
        }
        return options;
    };

    return (
        <select name="category" id="category" defaultValue={defaultCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            {createOptions()}
        </select>
    );
}