'use client';

export default function ImageUploadComponent() {
    return (
        <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
            <input type="file" id="image" name="image"  required />
        </div>
    );
}