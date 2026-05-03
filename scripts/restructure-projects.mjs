import fs from 'fs';
import path from 'path';

const projectsDir = path.join(process.cwd(), 'public/images/projects');
const folders = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory() && f.startsWith('project-'));

for (const folder of folders) {
  const folderPath = path.join(projectsDir, folder);
  const files = fs.readdirSync(folderPath);
  
  for (const file of files) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const newName = `${folder}-${basename}${ext}`;
    
    fs.renameSync(path.join(folderPath, file), path.join(projectsDir, newName));
  }
  
  fs.rmdirSync(folderPath);
}

console.log('Restructured projects folder successfully.');
