"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { Camera } from "lucide-react";

interface Props {
  mobile: string;
}

export default function ProfileStep({ mobile }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { loading, handleCreateProfile } = useAuth();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!image) return;
    handleCreateProfile({ mobile, name, email, qualification, image });
  }, [mobile, name, email, qualification, image, handleCreateProfile]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Add Your Details
        </h2>

        {/* Photo upload */}
        <div className="mt-3 flex justify-center">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-6 cursor-pointer hover:border-gray-400 transition overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <>
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-400">
                  Add Your Profile picture
                </p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="mt-3 space-y-3">
          {[
            {
              label: "Name *",
              value: name,
              setter: setName,
              placeholder: "Enter your Full Name",
              type: "text",
            },
            {
              label: "Email",
              value: email,
              setter: setEmail,
              placeholder: "Enter your Email Address",
              type: "email",
            },
            {
              label: "Your qualification *",
              value: qualification,
              setter: setQualification,
              placeholder: "eg. B.Tech, MBA...",
              type: "text",
            },
          ].map((field) => (
            <div key={field.label} className="relative">
              <div className="border border-gray-300 rounded-lg px-3 pt-3 pb-2">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-600 font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full outline-none text-sm text-gray-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full  bg-[#1c3141] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#243460] transition disabled:opacity-60"
      >
        {loading ? "Creating..." : "Get Started"}
      </button>
    </div>
  );
}
