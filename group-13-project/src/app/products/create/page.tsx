import EditProductForm from "@/app/ui/editProductForm";
import { fetchProductById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Create Product',
};

export default async function Page() {
    return (
        <main>
            <h1>Create Product</h1>
            {/** Create Product Form Here */}
        </main>
    );
}