/** biome-ignore-all lint/correctness/useExhaustiveDependencies: explanation */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import MediaGallery from "@/components/pages/MediaGallery";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // const handleFilesUpload = async (files: FileList) => {
  //   const form = new FormData();
  //   for (const f of Array.from(files)) {
  //     form.append("files", f); // कोई return नहीं
  //   }
  //   const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  //   if (!res.ok) throw new Error("Upload failed");
  //   return res.json();
  // };


  const deleteImage = async (publicId: string) => {
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.public_id !== publicId));
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting image");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6">
      <MediaGallery
        images={images}
        isLoading={isLoading}
        fetchImages={fetchImages}
        deleteImage={deleteImage}
        copyToClipboard={copyToClipboard}
        formatFileSize={formatFileSize}
      />
    </div>
  );
}
