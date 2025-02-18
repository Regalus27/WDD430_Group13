'use client';

import { uploadImage } from "@/lib/actions";

export default function ImageForm() {
    return (
        <form action={uploadImage} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                <input type="file" id="image" name="image" required />
            </div>
            <button type="submit">Upload</button>
        </form>
    );
}