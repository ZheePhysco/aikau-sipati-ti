import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputs = [
  { path: 'public/images/hero/bg.png', width: 1920, height: 1080, category: 'HERO', title: 'BACKGROUND' },
  { path: 'public/images/gallery/01.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 01' },
  { path: 'public/images/gallery/02.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 02' },
  { path: 'public/images/gallery/03.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 03' },
  { path: 'public/images/gallery/04.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 04' },
  { path: 'public/images/gallery/05.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 05' },
  { path: 'public/images/gallery/06.png', width: 800, height: 1000, category: 'GALLERY', title: 'WORK 06' },
  { path: 'public/images/projects/project-01-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/projects/project-02-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/projects/project-03-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/projects/project-04-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/projects/project-05-main.png', width: 1200, height: 1600, category: 'SHOULDER PIECE', title: 'PROJECT 05' },
  { path: 'public/images/projects/project-05-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/projects/project-06-main.png', width: 1200, height: 1600, category: 'BACK PIECE', title: 'PROJECT 06' },
  { path: 'public/images/projects/project-06-detail-01.png', width: 800, height: 800, category: 'DETAIL', title: '01' },
  { path: 'public/images/textures/texture.png', width: 512, height: 512, category: 'TEXTURE', title: 'BG' },
];

async function generate() {
  for (const item of outputs) {
    const svgText = `
      <svg width="${item.width}" height="${item.height}" viewBox="0 0 ${item.width} ${item.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stop-color="#1A1410" />
            <stop offset="100%" stop-color="#080705" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C4A35A" stroke-width="1" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- Corner brackets -->
        <path d="M 40 20 L 20 20 L 20 40" fill="none" stroke="#C4A35A" stroke-width="2" />
        <path d="M ${item.width - 40} 20 L ${item.width - 20} 20 L ${item.width - 20} 40" fill="none" stroke="#C4A35A" stroke-width="2" />
        <path d="M 40 ${item.height - 20} L 20 ${item.height - 20} L 20 ${item.height - 40}" fill="none" stroke="#C4A35A" stroke-width="2" />
        <path d="M ${item.width - 40} ${item.height - 20} L ${item.width - 20} ${item.height - 20} L ${item.width - 20} ${item.height - 40}" fill="none" stroke="#C4A35A" stroke-width="2" />
        
        <!-- Center Geometric Pattern -->
        <g transform="translate(${item.width / 2 - 50}, ${item.height / 2 - 50})">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="#C4A35A" stroke-width="2" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="10" fill="#C4A35A" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#C4A35A" stroke-width="1" opacity="0.5"/>
          <line x1="0" y1="50" x2="100" y2="50" stroke="#C4A35A" stroke-width="1" opacity="0.5"/>
        </g>

        <!-- Bottom gradient overlay -->
        <rect x="0" y="${item.height - 150}" width="100%" height="150" fill="url(#grad)" opacity="0.8"/>
        
        <!-- Label -->
        <text x="40" y="${item.height - 60}" font-family="sans-serif" font-size="12" fill="#C4A35A" letter-spacing="0.2em">${item.category}</text>
        <text x="40" y="${item.height - 30}" font-family="serif" font-size="24" fill="#ffffff" font-style="italic">${item.title}</text>
      </svg>
    `;

    const dir = path.dirname(item.path);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(Buffer.from(svgText))
      .png()
      .toFile(item.path);
    console.log(`Generated ${item.path}`);
  }
}

generate().catch(console.error);
