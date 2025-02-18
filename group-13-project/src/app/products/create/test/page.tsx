import ImageForm from "@/app/ui/imageForm/imageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Test Page',
};

export default async function Page() {
    return (
        <main>
            <h1>Create Product</h1>
            <ImageForm />
        </main>
    );
}