import EditProductForm from "@/app/ui/editProductForm";
import { fetchProductById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: {params: Promise<{product_id: string}>}) {
    const params = await props.params;
    const product_id = params.product_id;

    try {
        const [product] = await Promise.all([
            fetchProductById(product_id),
        ]);

        return (
            <main>
                <EditProductForm product={product}/>
            </main>
        );

    } catch (error) {
        notFound();
    }
}