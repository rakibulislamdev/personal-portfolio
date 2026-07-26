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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Check if Cloudinary is configured
    const isCloudinaryConfigured =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_URL);

    if (isCloudinaryConfigured) {
      // Upload to Cloudinary Permanent CDN
      const cloudinaryResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "portfolio_uploads",
              resource_type: "auto",
              quality: "auto:best",
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
