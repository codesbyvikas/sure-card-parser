// src/types/UploadedFile.ts

export type UploadedFile = {
  name: string;
  size: number;      // Size in MB
  progress: number;  // Upload progress (0–100)
  file?: File;       // Actual file reference (used when uploading)
};
