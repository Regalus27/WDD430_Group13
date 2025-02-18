import { Images } from "@/app/ui/imageForm/images";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Test Images Page',
};

export default async function Page() {
    return (
        <main>
            <h1>All Images</h1>
            <Images />
        </main>
    );
}