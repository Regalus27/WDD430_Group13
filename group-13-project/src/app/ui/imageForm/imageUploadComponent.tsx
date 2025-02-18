'use client';

export default function ImageUploadComponent() {
    // Add filesize validation, but more important to give teammates time to add it into things they need to.
    // Also figure out how to pass in the current image
    return (
        <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
            <input type="file" id="image" name="image" accept="image/*" required />
        </div>
    );
}