import { fetchProductById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: {params: Promise<{product_id: string}>}) {
    const params = await props.params;
    const product_id = params.product_id;

    try {
        const [product] = await Promise.all([
            fetchProductById(product_id),
        ]);

        // TODO
        // Edit form
        // 

        return (
            <main>
                {/** Temporary */}
                <p>{product.product_name}</p>
                <p>{product.price_in_cents}</p>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <p>{product.created_at.toString()}</p>
            </main>
        );

    } catch (error) {
        // Should check for specific errors and pass not found page info
        notFound();
    }
}