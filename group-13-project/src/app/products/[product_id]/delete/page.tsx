import { fetchProductById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Delete Product',
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
            <h1>Delete Product</h1>
            {/** Delete Form */}
        </main>
    );
}