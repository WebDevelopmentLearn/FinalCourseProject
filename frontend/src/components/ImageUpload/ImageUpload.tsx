import {ChangeEvent, FC, useState} from "react";
import {useFormContext} from "react-hook-form";


interface ImageUploadProps {
    name: string;
    label?: string;
    required?: boolean;
    accept?: string;
}

export const ImageUpload: FC<ImageUploadProps> = ({ name, label, required = false, accept = 'image/*' }) => {
    const { register, setValue } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);

            // Update RHF value
            setValue(name, file);
        }
    };

    return (
        <div className="image-upload">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="preview-container">
                {preview ? (
                    <img src={preview} alt="Preview" className="preview-image" />
                ) : (
                    <div className="placeholder">Upload an image</div>
                )}
            </div>
            <input
                type="file"
                id={name}
                accept={accept}
                {...register(name, { required })}
                onChange={handleFileChange}
                className="file-input"
            />
        </div>
    );
};

export default ImageUpload;