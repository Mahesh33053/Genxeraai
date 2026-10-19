import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const appDir = path.join(rootDir, 'artifacts', 'genxeraai-home');

console.log('====================================================');
console.log('🤖 ROBOT TESTING SUITE: AUDIT, SEO, LINKS & BACKLINKS');
console.log('====================================================\n');

const errors = [];
const warnings = [];

// 1. Core File Verification
const requiredFiles = [
  'index.html',
  'internship.html',
  'courses.html',
  'workshops.html',
  'platform.html',
  'style.css',
  'script.js',
  'internship.js',
  'courses.js',
  'workshops.js',
  'platform.js',
  'enroll-modal.js',
  'assets/logos/logo.png',
  'public/robots.txt',
  'public/favicon.svg',
  'public/sitemap.xml'
];

for (const file of requiredFiles) {
  const fullPath = path.join(appDir, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${file}`);
  } else {
    console.log(`[PASS] Core file exists: ${file}`);
  }
}

// 2. Validate Sitemap.xml
console.log('\nValidating public/sitemap.xml...');
const sitemapContent = fs.readFileSync(path.join(appDir, 'public', 'sitemap.xml'), 'utf8');
if (!sitemapContent.startsWith('<?xml')) {
  errors.push('sitemap.xml is missing XML declaration');
}
const sitemapUrls = [...sitemapContent.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`Found ${sitemapUrls.length} URLs in sitemap.xml`);

// 3. Validate Robots.txt
console.log('\nValidating public/robots.txt...');
const robotsContent = fs.readFileSync(path.join(appDir, 'public', 'robots.txt'), 'utf8');
if (!robotsContent.includes('Sitemap: https://www.genxeraai.com/sitemap.xml')) {
  errors.push('robots.txt does not link to sitemap.xml');
} else {
  console.log('[PASS] robots.txt properly references sitemap.xml');
}

// 4. HTML Deep Inspection: Tags, Links, Anchors, Schema
function scanHtml(filename) {
  const content = fs.readFileSync(path.join(appDir, filename), 'utf8');
  console.log(`\nInspecting ${filename}...`);

  // Verify type="module" on scripts
  const scriptTags = [...content.matchAll(/<script\b([^>]*)>/g)];
  for (const s of scriptTags) {
    const attrs = s[1];
    if (attrs.includes('src=') && !attrs.includes('type="module"')) {
      errors.push(`Script tag in ${filename} missing type="module": ${s[0]}`);
    }
  }

  // Anchor and asset verification
  const assetRegex = /(?:src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        new URL(url);
        if (url.includes('wa.me') && !url.includes('919390560407')) {
          warnings.push(`Suspicious WhatsApp number in ${filename}: ${url}`);
        }
      } catch (e) {
        errors.push(`Malformed URL in ${filename}: ${url}`);
      }
    } else if (url.startsWith('#')) {
      const anchor = url.slice(1);
      if (anchor && !content.includes(`id="${anchor}"`)) {
        errors.push(`Broken internal anchor in ${filename}: ${url}`);
      }
    } else if (url.startsWith('mailto:')) {
      if (!url.includes('@')) {
        errors.push(`Invalid mailto in ${filename}: ${url}`);
      }
    }
  }

  // Alt attributes
  const imgRegex = /<img\b([^>]*)>/g;
  while ((match = imgRegex.exec(content)) !== null) {
    const attrs = match[1];
    if (!attrs.includes('alt=')) {
      errors.push(`Image missing alt in ${filename}: ${match[0]}`);
    } else if (/alt=["']\s*["']/.test(attrs)) {
      warnings.push(`Image with empty alt in ${filename}: ${match[0]}`);
    }
  }

  // SEO critical elements
  if (!content.includes('<title>')) errors.push(`Missing <title> in ${filename}`);
  if (!content.includes('name="description"')) errors.push(`Missing meta description in ${filename}`);
  if (!content.includes('name="viewport"')) errors.push(`Missing meta viewport in ${filename}`);
  if (!content.includes('rel="canonical"')) errors.push(`Missing canonical tag in ${filename}`);
  if (!content.includes('og:title')) errors.push(`Missing og:title in ${filename}`);
  if (!content.includes('og:image')) errors.push(`Missing og:image in ${filename}`);
  if (!content.includes('twitter:card')) errors.push(`Missing twitter:card in ${filename}`);
  if (!content.includes('application/ld+json')) errors.push(`Missing JSON-LD structured data in ${filename}`);
}

scanHtml('index.html');
scanHtml('internship.html');
scanHtml('courses.html');
scanHtml('workshops.html');
scanHtml('platform.html');

// 5. Internship Track Verification
console.log('\nValidating all 12 internship tracks...');
const internshipJs = fs.readFileSync(path.join(appDir, 'internship.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');
const trackMatches = [...internshipJs.matchAll(/"([a-z0-9-]+)":\s*{\s*id:\s*"([a-z0-9-]+)"/g)];

if (trackMatches.length !== 12) {
  errors.push(`Expected 12 tracks in internship.js, found ${trackMatches.length}`);
}

for (const match of trackMatches) {
  const trackId = match[1];
  const expectedUrl = `https://www.genxeraai.com/internships/${trackId}`;
  if (!sitemapUrls.includes(expectedUrl)) {
    errors.push(`Track ${trackId} missing from sitemap.xml!`);
  }
  if (!indexHtml.includes(`/internships/${trackId}`)) {
    errors.push(`Track ${trackId} not linked from homepage!`);
  }
}
console.log(`[PASS] All ${trackMatches.length} tracks verified in JS, HTML, and Sitemap.`);

// Summary
console.log('\n====================================================');
console.log(`AUDIT RESULTS: ${errors.length} Errors, ${warnings.length} Warnings`);
console.log('====================================================');
if (errors.length > 0) {
  errors.forEach(e => console.error(` ❌ [ERROR] ${e}`));
  process.exit(1);
} else {
  console.log('✅ ALL ROBOT TESTS PASSED PERFECTLY!\n');
}
