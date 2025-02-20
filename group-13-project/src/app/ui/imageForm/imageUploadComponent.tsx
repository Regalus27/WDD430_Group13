'use client';

export default function ImageUploadComponent() {

    const toggleImageBypass = () => {
        const bypassElement = document.getElementById("image_bypass") as HTMLInputElement;
        const imageUpload = document.getElementById("image") as HTMLInputElement; // see imageUploadComponent
        const imageLabel = document.getElementById("image_label") as HTMLLabelElement;
        if (bypassElement.checked) {
          // is checked, disable file input and remove required
          imageUpload.required = false;
          imageUpload.disabled = true;
          imageUpload.hidden = true;
    
          imageLabel.hidden = true;
        } else {
          // enable file input, add required
          imageUpload.required = true;
          imageUpload.disabled = false;
          imageUpload.hidden = false;
    
          imageLabel.hidden = false;
        }
      }

    return (
        <>
            <div className="mb-5">
                <label htmlFor="image_bypass" className="className=block mb-2 text-sm font-medium text-gray-900">Use Existing Image?</label>
                <input type="checkbox" id="image_bypass" name="image_bypass" onChange={toggleImageBypass}/>
            </div>
            <div className="mb-5">
                <label htmlFor="image" id="image_label" className="block mb-2 text-sm font-medium text-gray-900">Image (Must be smaller than 3MB)</label>
                <input type="file" id="image" name="image" accept="image/*" required />
            </div>
        </>
        
    );
}