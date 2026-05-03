import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    
    // Pastikan folder ada
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ images: [] });
    }

    // Baca semua file di folder gallery
    const files = fs.readdirSync(galleryDir);
    
    // Filter hanya file gambar (jpg, jpeg, png, webp, gif)
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b)); // Sort alfabetik

    // Return full paths
    const imagePaths = imageFiles.map(file => `/images/gallery/${file}`);

    return NextResponse.json({ images: imagePaths });
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
