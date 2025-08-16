#!/usr/bin/env node

/**
 * Build Validation Script
 * Validates the production build for deployment readiness
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

console.log('🔍 Validating production build...\n');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Validation checks
const checks = [
  {
    name: 'HTML file exists',
    check: () => fs.existsSync(path.join(distPath, 'index.html')),
    required: true
  },
  {
    name: 'Assets directory exists',
    check: () => fs.existsSync(path.join(distPath, 'assets')),
    required: true
  },
  {
    name: 'JavaScript chunks exist',
    check: () => {
      const assetsDir = path.join(distPath, 'assets');
      if (!fs.existsSync(assetsDir)) return false;
      const files = fs.readdirSync(assetsDir);
      return files.some(file => file.endsWith('.js'));
    },
    required: true
  },
  {
    name: 'CSS files exist',
    check: () => {
      const assetsDir = path.join(distPath, 'assets');
      const cssDir = path.join(distPath, 'assets', 'css');
      if (!fs.existsSync(assetsDir)) return false;
      
      // Check both assets root and css subdirectory
      const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
      const cssFiles = fs.existsSync(cssDir) ? fs.readdirSync(cssDir) : [];
      
      return assetFiles.some(file => file.endsWith('.css')) || 
             cssFiles.some(file => file.endsWith('.css'));
    },
    required: true
  },
  {
    name: 'Service Worker exists',
    check: () => fs.existsSync(path.join(distPath, 'sw.js')),
    required: false
  },
  {
    name: 'Manifest file exists',
    check: () => fs.existsSync(path.join(distPath, 'manifest.webmanifest')),
    required: false
  }
];

let passed = 0;
let failed = 0;

checks.forEach(({ name, check, required }) => {
  const result = check();
  if (result) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    const icon = required ? '❌' : '⚠️';
    console.log(`${icon} ${name}`);
    if (required) failed++;
  }
});

// Check file sizes
console.log('\n📊 Build Analysis:');

try {
  const stats = fs.statSync(distPath);
  const assetsDir = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
    const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
    
    console.log(`📁 Total assets: ${assetFiles.length}`);
    console.log(`🟨 JavaScript files: ${jsFiles.length}`);
    console.log(`🟦 CSS files: ${cssFiles.length}`);
    
    // Check for large files
    assetFiles.forEach(file => {
      const filePath = path.join(assetsDir, file);
      const size = fs.statSync(filePath).size;
      const sizeKB = Math.round(size / 1024);
      
      if (sizeKB > 500) {
        console.log(`⚠️  Large file detected: ${file} (${sizeKB}KB)`);
      }
    });
  }
} catch (error) {
  console.log('⚠️  Could not analyze build files');
}

// Final result
console.log('\n' + '='.repeat(50));
if (failed === 0) {
  console.log('🎉 Build validation passed! Ready for deployment.');
  console.log(`✅ ${passed} checks passed`);
  process.exit(0);
} else {
  console.log('❌ Build validation failed!');
  console.log(`❌ ${failed} required checks failed`);
  console.log(`✅ ${passed} checks passed`);
  process.exit(1);
}