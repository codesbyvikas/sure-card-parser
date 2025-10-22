// src/types/UploadedFile.ts

export type UploadedFile = {
  name: string;
  size: number;     // Size in MB
  progress: number; // Upload progress (0–100)
};
