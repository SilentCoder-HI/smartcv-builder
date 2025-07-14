"use client";

import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { UploadIcon } from "lucide-react";

export default function UserMetaCard() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading file:", file);
      // TODO: Handle image upload here
    }
  };

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800 flex flex-col items-center">
      {/* Profile Image with Upload Button */}
      <div className="relative w-32 h-32 mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700">
          <Image
            width={128}
            height={128}
            src={session?.user?.image ?? "/default-avatar.png"}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <button
          onClick={handlePhotoUpload}
          className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          title="Upload Profile Photo"
        >
          <UploadIcon size={18} />
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.svg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Name and Email */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {session?.user?.name ?? "No Name"}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {session?.user?.email ?? "No Email"}
      </p>
    </div>
  );
}
