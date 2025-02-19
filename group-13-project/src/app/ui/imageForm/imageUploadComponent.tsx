'use client';

export default function ImageUploadComponent() {
    return (
        <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image (Must be smaller than 3MB)</label>
            <input type="file" id="image" name="image" accept="image/*" required />
        </div>
    );
}