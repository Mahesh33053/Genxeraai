import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pipeline } from 'node:stream/promises';

const destDir = 'C:\\Users\\mahes\\AppData\\Local\\Programs\\MinGit';
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const zipPath = path.join(destDir, 'mingit.zip');
const url = 'https://github.com/git-for-windows/git/releases/download/v2.56.0.windows.2/MinGit-2.56.0.2-64-bit.zip';

console.log('Downloading MinGit from', url);
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
await pipeline(res.body, fs.createWriteStream(zipPath));
console.log('Download complete. Extracting with tar/powershell...');

try {
  execSync(`tar -xf "${zipPath}" -C "${destDir}"`);
} catch (e) {
  execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${destDir}' -Force"`);
}

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const gitPath = path.join(destDir, 'cmd', 'git.exe');
console.log('MinGit installed successfully to:', gitPath);
const version = execSync(`"${gitPath}" --version`).toString().trim();
console.log('Verified Git version:', version);
