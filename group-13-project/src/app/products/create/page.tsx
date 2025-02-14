import CreateProductForm from "@/app/ui/products/createProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Product',
};

export default async function Page() {
    return (
        <main>
            <h1>Create Product</h1>
            <CreateProductForm />
        </main>
    );
}