import Image from "next/image";
import defaultAvataraImg from "@/public/images/non_profile_image.webp";
import Button from "../ui/button";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/lib/fetch-client";
import { toast } from "react-toastify";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function ImageUpload({ base64Avatar }) {
  const imgInputRef = useRef();

  const handleUploadClick = () => {
    imgInputRef?.current?.click();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (base64) =>
      sendRequest("user/profile-picture", { profile_pic: base64 }, "PUT"),
    onSuccess: () => {
      toast.success("Profile picture updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const handleFileChange = async (e) => {
    const base64 = await convertToBase64(e.target.files?.[0]);
    mutate(base64);
  };

  return (
    <div className="w-[120px] md:w-[150px] aspect-square m-auto rounded-full bg-primary-gradient p-1 relative">
      <div className="w-full aspect-square overflow-hidden rounded-full relative">
        {isPending ? (
          <div className="bg-theme-black text-white absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <i className="bx bx-loader-alt text-2xl animate-spin"></i>
          </div>
        ) : (
          <Image
            src={base64Avatar || defaultAvataraImg}
            alt={`${base64Avatar ? "anonymus avatar" : "user's avatar"}`}
            fill
            className="object-cover object-center"
          />
        )}
      </div>
      <input
        ref={imgInputRef}
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
      />
      <Button
        variant="icon"
        className="absolute right-0 bottom-0 z-20 p-2 bg-theme-black text-white rounded-full"
      >
        <i className="bx bx-image-add text-xl" onClick={handleUploadClick}></i>
      </Button>
    </div>
  );
}
