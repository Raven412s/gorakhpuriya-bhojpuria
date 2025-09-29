"use client";

import { Copy, Eye, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: string;
}

interface Props {
  images: CloudinaryImage[];
  isLoading: boolean;
  fetchImages: () => Promise<void>;
  // NEW: optional fallback (not used for progress)
  handleFilesUpload?: (files: FileList) => Promise<CloudinaryImage[]>;
  deleteImage: (publicId: string) => Promise<void>;
  copyToClipboard: (text: string) => void;
  formatFileSize: (bytes: number) => string;
}

export default function MediaGallery({
  images,
  isLoading,
  fetchImages,
  handleFilesUpload, // optional fallback
  deleteImage,
  copyToClipboard,
  formatFileSize,
}: Props) {
  const [localLoading, setLocalLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string>("");

  // === NEW: XHR uploader with progress per file ===
  const uploadFilesWithProgress = async (files: FileList) => {
    const filesArr = Array.from(files);
    if (filesArr.length === 0) return;

    // Basic validation
    const oversize = filesArr.find((f) => f.size > 10 * 1024 * 1024);
    if (oversize) {
      toast.error(`"${oversize.name}" is larger than 10MB`);
      return;
    }

    setLocalLoading(true);

    // Upload files sequentially (safer for rate limits). Want parallel? Use Promise.all on map.
    for (const file of filesArr) {
      const id = toast.loading(`Uploading ${file.name} — 0%`);

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const form = new FormData();
          form.append("files", file); // API supports multiple; per-file send for cleaner progress

          xhr.open("POST", "/api/admin/upload", true);

          // progress event (upload to server)
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = Math.min(99, Math.round((e.loaded / e.total) * 100));
              toast.message(`Uploading ${file.name} — ${percent}%`, { id });
            }
          };

          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status >= 200 && xhr.status < 300) {
                toast.success(`Uploaded ${file.name}`, { id });
                resolve();
              } else {
                const msg = xhr.responseText || "Upload failed";
                toast.error(`Failed: ${file.name}`, { id });
                reject(new Error(msg));
              }
            }
          };

          xhr.onerror = () => {
            toast.error(`Network error: ${file.name}`, { id });
            reject(new Error("Network error"));
          };

          xhr.send(form);
        });
      } catch (err) {
        console.error(err);
        // continue to next file
      }
    }

    await fetchImages();
    setLocalLoading(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Prefer XHR for progress; fallback to provided handler if any
    if (typeof window !== "undefined" && "XMLHttpRequest" in window) {
      await uploadFilesWithProgress(files);
    } else if (handleFilesUpload) {
      setLocalLoading(true);
      try {
        await handleFilesUpload(files);
        await fetchImages();
      } finally {
        setLocalLoading(false);
      }
    }
    // reset input so same file can be selected again if needed
    e.currentTarget.value = "";
  };

  return (
    <div>
      <div className="mb-6 p-4 border rounded-lg bg-muted/30">
        <label htmlFor="image-upload" className="block mb-2 font-medium">
          Upload New Image(s)
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple // NEW
            onChange={onFileChange}
            className="cursor-pointer flex-1"
          />
          <Button
            onClick={() => document.getElementById("image-upload")?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Browse Files
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Supported: JPG, PNG, GIF, WEBP • Max per file: 10MB • You can select multiple files
        </p>
      </div>

      {localLoading || isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : images?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No images found.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload your first image to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.public_id}
              className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-muted">
                <Image
                  src={image.secure_url}
                  alt={image.public_id}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(image.secure_url, "_blank")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setImageToDelete(image.public_id);
                      setDeleteDialogOpen(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium truncate">
                    {image.public_id.split("/").pop()}
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-md">
                    {image.format.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{formatFileSize(image.bytes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensions:</span>
                    <span>
                      {image.width} × {image.height} px
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uploaded:</span>
                    <span>
                      {new Date(image.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input value={image.secure_url} readOnly className="text-xs h-8" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(image.secure_url)}
                    className="h-8 w-8 shrink-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone and will permanently remove the image from Cloudinary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!imageToDelete) return;
                await deleteImage(imageToDelete);
                setDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Image
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
