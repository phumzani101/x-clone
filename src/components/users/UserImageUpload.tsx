import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UserImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange: (image: string) => void;
  title: string;
}

const UserImageUpload: FC<UserImageUploadProps> = ({
  value,
  disabled,
  onChange,
  title,
}) => {
  const [image, setImage] = useState(value);

  const handleChange = useCallback(
    (file: string) => {
      onChange(file);
    },
    [onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImage(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="flex items-center justify-center">
          <Image src={image} height={100} width={100} alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{title}</p>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default UserImageUpload;
