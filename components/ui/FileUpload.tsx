"use client";

import { useRef, useState } from "react";

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  label?: string;
}

export function FileUpload({
  accept = ".csv",
  onFileSelect,
  selectedFile,
  label = "选择文件",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-500/10"
            : selectedFile
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-slate-700 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-900/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
            <svg
              className="h-6 w-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          {selectedFile ? (
            <div>
              <p className="text-sm font-medium text-emerald-400">{selectedFile.name}</p>
              <p className="mt-1 text-xs text-slate-400">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-slate-200">
                {isDragging ? "松开以上传" : "点击或拖拽文件到这里"}
              </p>
              <p className="mt-1 text-xs text-slate-500">支持 CSV 格式</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

