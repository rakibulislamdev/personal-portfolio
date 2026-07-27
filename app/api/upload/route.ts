import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Configure Cloudinary if environment variables are provided
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadType = formData.get("type") as string | null;
    const fileNameLower = file.name.toLowerCase();
    const isPdfExtension = fileNameLower.endsWith(".pdf");
    const isPdfMime = file.type === "application/pdf";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // PDF Magic Bytes Check: First 4 bytes must be '%PDF' (0x25, 0x50, 0x44, 0x46)
    const isPdfMagicBytes =
      buffer.length >= 4 &&
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46;

    // Strict validation if upload is marked for resume or is a PDF
    if (uploadType === "resume") {
      if (!isPdfMime && !isPdfExtension && !isPdfMagicBytes) {
        return NextResponse.json(
          { error: "Invalid file format. Only valid PDF files (.pdf) are allowed for Resume upload!" },
          { status: 400 }
        );
      }
      if (!isPdfMagicBytes) {
        return NextResponse.json(
          { error: "Corrupted or invalid PDF file header detected!" },
          { status: 400 }
        );
      }
    }

    // Check if Cloudinary is configured
    const isCloudinaryConfigured =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_URL);

    if (isCloudinaryConfigured) {
      // PDF files in Cloudinary MUST be uploaded with resource_type: 'raw' to be viewable as documents
      const isPdfFile =
        fileNameLower.endsWith(".pdf") ||
        file.type === "application/pdf" ||
        uploadType === "resume";

      const cloudinaryResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "portfolio_uploads",
              resource_type: isPdfFile ? "raw" : "auto",
            },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Cloudinary upload failed"));
              }
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        }
      );

      return NextResponse.json({ url: cloudinaryResult.secure_url });
    } else {
      // Fallback to local public/uploads storage
      const fileExtension = path.extname(file.name) || ".png";
      const fileName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExtension}`;

      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${fileName}`;
      return NextResponse.json({ url: publicUrl });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
