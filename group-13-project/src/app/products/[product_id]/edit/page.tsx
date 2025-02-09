import EditProductForm from "@/app/ui/editProductForm";
import { fetchProductById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// TODO: Update the update query to check if user_id matches user_id of queried object
// Needs auth first though.

export const metadata: Metadata = {
    title: 'Edit Product',
};

export default async function Page(props: {params: Promise<{product_id: string}>}) {
    const params = await props.params;
    const product_id = params.product_id;
    const [product] = await Promise.all([
        fetchProductById(product_id),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <h1>Edit Product</h1>
            <EditProductForm product={product}/>
        </main>
    );
}