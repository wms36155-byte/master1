"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  value: string;

  onChange: (url: string) => void;
};

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
          "upload_preset",
          process.env
            .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
            ""
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        onChange(data.secure_url);

        toast.success(
          "Rasm yuklandi"
        );
      } catch (error) {
        toast.error(
          "Upload xatolik"
        );
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } =
    useDropzone({
      onDrop,

      accept: {
        "image/*": [],
      },

      multiple: false,
    });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-white/20 rounded-3xl p-10 text-center cursor-pointer hover:border-green-500 transition-all"
      >
        <input {...getInputProps()} />

        <p className="text-white/60">
          Rasm tashlang yoki tanlang
        </p>
      </div>

      {value && (
        <div className="relative mt-5 h-64 rounded-3xl overflow-hidden">
          <Image
            src={value}
            alt="Uploaded"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}