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
        console.log(product.category);
        // TODO
        // Edit form html / css / stuff
        // Figure out states to get userId?
        // Validate database info get
        // Fill in via database get
        // validate form data
        // push to server
        // server side checks
        // push to database

        // ;-; I forgot how complicated this got

        return (
            <main>
                <p>{product.product_id}</p>
                <p>{product.product_name}</p>
                <p>{product.price_in_cents}</p>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <p>{product.created_at.toString()}</p>
                <EditProductForm product={product}/>
            </main>
        );

    } catch (error) {
        // Should check for specific errors and pass not found page info
        console.log(error);
        notFound();
    }
}