"use client";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  onSelectImage: (img: string, file: File) => void;
}
const ImagePicker = ({ onSelectImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInput = () => {
    if (!fileInputRef?.current || !fileInputRef?.current.click) return;
    fileInputRef?.current?.click();
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = !!e.target.files ? e.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (loadEvent.target?.result) {
        setSelectedImage(loadEvent.target?.result as string);
        onSelectImage(loadEvent.target?.result as string, file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        multiple={false}
        ref={fileInputRef}
        onChange={onImageChange}
      />
      <img
        src={selectedImage}
        alt="selected image"
        className="flex-1 w-full bg-primary min-h-40 max-h-96 rounded-xl cursor-pointer"
        onClick={handleFileInput}
      />
    </>
  );
};

export default ImagePicker;
