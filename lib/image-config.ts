// lib/image-config.ts
// ================================================
// PANDUAN GANTI GAMBAR:
// 1. Taruh foto di folder yang sesuai (lihat public/images/*/README.txt)
// 2. Update nama file di bawah ini
// 3. Selesai — tidak perlu sentuh file lain
//
// CATATAN KHUSUS GALLERY:
// Gallery sekarang DINAMIS — tidak perlu edit code.
// Cukup tambah/hapus file di folder public/images/gallery/
// Website otomatis akan menyesuaikan saat di-refresh.
// ================================================

export const IMAGES = {
  // HERO BACKGROUND
  hero: '/images/hero/bg.jpeg',

  // ARTIST PHOTO
  artist: '/images/artist/edo.jpg',

  // GALLERY
  gallery: [
    '/images/gallery/1000195073.jpg',
    '/images/gallery/1000195075.jpg',
    '/images/gallery/1000195077.jpg',
    '/images/gallery/1000195083.jpg',
    '/images/gallery/4295634e94f713a5b74c772d34cb8204.jpg',
    '/images/gallery/IMG-20240726-WA0063.jpg',
    '/images/gallery/IMG-20240726-WA0066.jpg',
    '/images/gallery/IMG-20240726-WA0069.jpg',
    '/images/gallery/IMG-20250827-WA0025.jpg',
    '/images/gallery/IMG-20250828-WA0019.jpg',
    '/images/gallery/IMG-20250828-WA0023(1).jpg',
    '/images/gallery/IMG-20250828-WA0025(1).jpg',
    '/images/gallery/IMG-20250828-WA0027.jpg',
    '/images/gallery/IMG-20250907-WA0037.jpg',
    '/images/gallery/IMG_20240726_193208_395.jpg',
    '/images/gallery/IMG_20250830_184957_362.jpg',
    '/images/gallery/motion_photo_2035101837612929098.jpg',
    '/images/gallery/motion_photo_5299152759686770160.jpg',
  ],

  // LOGO
  logo: '/images/brand/logo.jpg',

  // PROJECTS (detail page setiap karya)
  projects: [
    {
      id: 'protection',
      main: '/images/projects/project-01-main.jpg',
      details: [],
    },
    {
      id: 'courage',
      main: '/images/projects/project-02-main.jpg',
      details: [],
    },
    {
      id: 'heritage',
      main: '/images/projects/project-03-main.jpg',
      details: [],
    },
    {
      id: 'journey',
      main: '/images/projects/project-04-main.jpg',
      details: [],
    },
    {
      id: 'spirit',
      main: '/images/projects/project-05-main.jpg',
      details: [],
    },
    {
      id: 'roots',
      main: '/images/projects/project-06-main.jpg',
      details: [],
    },
  ],

  // BACKGROUND TEXTURE (opsional)
  texture: '/images/textures/texture.png',
}

// Smart image component — otomatis fallback ke SVG pattern
export function hasImage(path: string): boolean {
  return path !== '' && path !== undefined
}
