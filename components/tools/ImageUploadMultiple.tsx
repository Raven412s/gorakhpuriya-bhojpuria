// components/ui/MultiImageUploader.tsx
/** biome-ignore-all lint/a11y/noLabelWithoutControl: explanation */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: explanation */
"use client";

import { Check, Image as ImageIcon, Loader2, Upload, Video, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface UploadedAsset {
  public_id?: string;
  secure_url?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface MultiImageUploaderProps {
  endpoint?: string;
  /** image max size MB */
  maxImageSizeMB?: number;
  /** video max size MB */
  maxVideoSizeMB?: number;
  accept?: string;
  onComplete?: (uploaded: UploadedAsset[]) => void;
  onError?: (error: Error) => void;
  label?: string;
  multiple?: boolean;
}

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error" | "canceled";
  error?: string;
  uploaded?: UploadedAsset;
}

export default function MultiImageUploader({
  endpoint = "/api/admin/upload",
  maxImageSizeMB = 10,
  maxVideoSizeMB = 100,
  accept = "image/*,video/*",
  onComplete,
  label = "Upload Files",
  multiple = true,
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<FileItem[]>([]);
  const [isDragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      if (!arr.length) return;

      const oversize = arr.find((f) => {
        if (f.type.startsWith("video/")) {
          return f.size > maxVideoSizeMB * 1024 * 1024;
        }
        return f.size > maxImageSizeMB * 1024 * 1024;
      });

      if (oversize) {
        const limit = oversize.type.startsWith("video/")
          ? maxVideoSizeMB
          : maxImageSizeMB;
        toast.error(
          `"${oversize.name}" is larger than ${limit}MB (${oversize.type.startsWith("video/") ? "video" : "image"})`
        );
        return;
      }

      const next: FileItem[] = arr.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()
          .toString(36)
          .slice(2)}`,
        file,
        progress: 0,
        status: "queued",
      }));
      setItems((prev) => [...prev, ...next]);
    },
    [maxImageSizeMB, maxVideoSizeMB]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files ? e.dataTransfer.files.length : null) {
      addFiles(e.dataTransfer.files);
    }
  };

  const startUpload = async () => {
    if (!items.length) {
      toast.message("Select files first");
      return;
    }

    setBusy(true);
    const uploaded: UploadedAsset[] = [];

    for (const it of items) {
      if (it.status === "done") continue;
      await new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        const form = new FormData();
        form.append("files", it.file);

        const id = toast.loading(`Uploading ${it.file.name} — 0%`);

        const update = (patch: Partial<FileItem>) =>
          setItems((prev) =>
            prev.map((p) => (p.id === it.id ? { ...p, ...patch } : p))
          );

        update({ status: "uploading", progress: 0 });

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.min(
              99,
              Math.round((e.loaded / e.total) * 100)
            );
            update({ progress: percent });
            toast.message(`Uploading ${it.file.name} — ${percent}%`, { id });
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const json = JSON.parse(xhr.responseText);
                const asset: UploadedAsset | undefined = Array.isArray(json)
                  ? json[0]
                  : json?.result || json;
                uploaded.push(asset ?? {});
              } catch {
                // ignore
              }
              update({ status: "done", progress: 100 });
              toast.success(`Uploaded ${it.file.name}`, { id });
              resolve();
            } else {
              const msg = xhr.responseText || "Upload failed";
              update({ status: "error", error: msg });
              toast.error(`Failed: ${it.file.name}`, { id });
              resolve();
            }
          }
        };

        xhr.onerror = () => {
          update({ status: "error", error: "Network error" });
          toast.error(`Network error: ${it.file.name}`);
          resolve();
        };

        xhr.open("POST", endpoint, true);
        xhr.send(form);
      });
    }

    setBusy(false);
    if (onComplete) {
      onComplete(uploaded);
      setItems([]);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-muted/30">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          "relative flex flex-col items-center justify-center gap-3",
          "rounded-xl border-2 border-dashed p-8 text-center",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30",
        ].join(" ")}
      >
        <Upload className="h-6 w-6" />
        <div className="text-sm">
          <span className="font-medium">Drag & drop</span> files here or
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="gap-2"
            disabled={busy}
          >
            <Upload className="h-4 w-4" /> Choose Files
          </Button>
          <span className="text-xs text-muted-foreground">
            (Images up to {maxImageSizeMB}MB, Videos up to {maxVideoSizeMB}MB)
          </span>
        </div>
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {/* Queue */}
      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-3 border rounded-lg p-3"
            >
              <div className="shrink-0 w-10 h-10 bg-muted rounded overflow-hidden flex items-center justify-center relative">
                {it.file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(it.file)}
                    alt={it.file.name}
                    className="object-cover w-full h-full"
                    fill
                  />
                ) : it.file.type.startsWith("video/") ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <ImageIcon className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-medium">
                    {it.file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(it.file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <div className="h-2 w-full bg-muted rounded overflow-hidden mt-2">
                  <div
                    className={"h-full bg-primary transition-all"}
                    style={{ width: `${it.progress}%` }}
                  />
                </div>
                <div className="mt-1 text-xs">
                  {it.status === "uploading" && (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" /> Uploading…{" "}
                      {it.progress}%
                    </span>
                  )}
                  {it.status === "done" && (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <Check className="h-3 w-3" /> Done
                    </span>
                  )}
                  {it.status === "error" && (
                    <span className="text-destructive">
                      {it.error || "Failed"}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(it.id)}
                disabled={busy && it.status === "uploading"}
                className="shrink-0"
                title="Remove"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          onClick={startUpload}
          disabled={busy || items.length === 0}
          className="gap-2"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {busy ? "Uploading…" : "Start Upload"}
        </Button>
        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setItems([])}
            disabled={busy}
          >
            Clear Queue
          </Button>
        )}
      </div>
    </div>
  );
}
