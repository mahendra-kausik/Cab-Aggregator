#!/usr/bin/env node

/**
 * Setup Verification Script
 * Verifies that all components are properly configured and running
 */

const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const checks = {
  files: [
    { path: '.env', required: true, description: 'Root environment file' },
    { path: 'frontend/.env', required: true, description: 'Frontend environment file' },
    { path: 'docker-compose.yml', required: true, description: 'Docker Compose configuration' },
    { path: 'backend/package.json', required: true, description: 'Backend dependencies' },
    { path: 'frontend/package.json', required: true, description: 'Frontend dependencies' },
  ],
  services: [
    { name: 'Frontend', url: 'http://localhost:3000', timeout: 5000 },
    { name: 'Backend', url: 'http://localhost:5000/health', timeout: 5000 },
    { name: 'API', url: 'http://localhost:5000/api', timeout: 5000 },
  ]
};

// Results tracking
const results = {
  files: { passed: 0, failed: 0 },
  services: { passed: 0, failed: 0 },
  overall: 'unknown'
};

// Utility functions
function log(message, level = 'info') {
  const icons = {
    info: '📋',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    section: '📦'
  };
  
  console.log(`${icons[level]} ${message}`);
}

function makeHttpRequest(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout }, (res) => {
      resolve({ statusCode: res.statusCode });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.on('error', reject);
  });
}

async function checkFiles() {
  log('Checking required files...', 'section');
  
  for (const file of checks.files) {
    const filePath = path.join(process.cwd(), file.path);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      log(`${file.description}: Found`, 'success');
      results.files.passed++;
    } else {
      log(`${file.description}: Missing`, 'error');
      results.files.failed++;
    }
  }
  
  console.log('');
}

async function checkServices() {
  log('Checking service endpoints...', 'section');
  
  for (const service of checks.services) {
    try {
      const response = await makeHttpRequest(service.url, service.timeout);
      
      if (response.statusCode >= 200 && response.statusCode < 400) {
        log(`${service.name}: Responding`, 'success');
        results.services.passed++;
      } else {
        log(`${service.name}: Unexpected status`, 'warning');
        results.services.failed++;
      }
    } catch (error) {
      log(`${service.name}: Not responding`, 'error');
      results.services.failed++;
    }
  }
  
  console.log('');
}

function generateReport() {
  console.log('='.repeat(60));
  log('SETUP VERIFICATION SUMMARY', 'section');
  console.log('='.repeat(60));
  
  console.log(`\nFiles:    ${results.files.passed} passed, ${results.files.failed} failed`);
  console.log(`Services: ${results.services.passed} healthy, ${results.services.failed} unhealthy`);
  
  if (results.files.failed > 0) {
    log('\n❌ Setup verification FAILED', 'error');
    console.log('\nRun: node scripts/dev-setup.js');
  } else if (results.services.failed > 0) {
    log('\n⚠️  Services not running', 'warning');
    console.log('\nRun: docker-compose up -d');
  } else {
    log('\n✅ Setup verification PASSED', 'success');
  }
  
  console.log('\n' + '='.repeat(60));
}

async function main() {
  try {
    console.log('🔍 CAB AGGREGATOR - SETUP VERIFICATION\n');
    
    await checkFiles();
    await checkServices();
    generateReport();
    
    process.exit(results.files.failed > 0 ? 1 : 0);
    
  } catch (error) {
    log(`Verification failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
