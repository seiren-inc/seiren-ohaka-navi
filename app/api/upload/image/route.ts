import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "misc";

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validation
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "File is not an image" }, { status: 400 });
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
            return NextResponse.json({ error: "File size exceeds 5MB" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Generate filename
        const ext = path.extname(file.name) || ".jpg";
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
        const filepath = path.join(uploadDir, filename);

        // Write file
        await fs.writeFile(filepath, buffer);

        // Return URL
        // Note: For production with Vercel Blob/S3, simple URL return works same way.
        const url = `/uploads/${folder}/${filename}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
