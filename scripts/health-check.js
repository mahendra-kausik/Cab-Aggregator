#!/usr/bin/env node

/**
 * Comprehensive Health Check Script
 * Monitors all services and provides detailed health status
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  services: {
    frontend: {
      name: 'Frontend (React)',
      url: 'http://localhost:3000',
      timeout: 5000,
      critical: true
    },
    backend: {
      name: 'Backend (Express)',
      url: 'http://localhost:5000/health',
      timeout: 5000,
      critical: true
    },
    api: {
      name: 'API Endpoints',
      url: 'http://localhost:5000/api',
      timeout: 5000,
      critical: true
    }
  }
};

// Results tracking
const results = {
  services: {},
  overall: {
    status: 'unknown',
    healthy: 0,
    warning: 0,
    critical: 0,
    total: 0
  },
  timestamp: new Date().toISOString(),
  duration: 0
};

// Utility functions
function log(message, level = 'info') {
  const icons = {
    info: '📋',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  
  console.log(`${icons[level]} ${message}`);
}

function makeHttpRequest(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.get(url, { timeout }, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          responseTime,
          data: data.substring(0, 1000)
        });
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout after ${timeout}ms`));
    });
    
    req.on('error', (error) => {
      reject(error);
    });
  });
}

async function checkHttpService(service) {
  const startTime = Date.now();
  
  try {
    const response = await makeHttpRequest(service.url, service.timeout);
    const responseTime = Date.now() - startTime;
    
    let status = 'healthy';
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      status = 'healthy';
    } else if (response.statusCode >= 300 && response.statusCode < 500) {
      status = 'warning';
    } else {
      status = 'critical';
    }
    
    return {
      status,
      responseTime,
      statusCode: response.statusCode,
      error: null
    };
    
  } catch (error) {
    return {
      status: 'critical',
      responseTime: Date.now() - startTime,
      statusCode: null,
      error: error.message
    };
  }
}

async function runHealthChecks() {
  const startTime = Date.now();
  
  log('Starting health check...', 'info');
  console.log('='.repeat(60));
  
  for (const [serviceName, service] of Object.entries(config.services)) {
    log(`Checking ${service.name}...`, 'info');
    
    const result = await checkHttpService(service);
    result.name = service.name;
    result.critical = service.critical;
    
    results.services[serviceName] = result;
    results.overall.total++;
    
    const statusIcon = {
      healthy: '✅',
      warning: '⚠️',
      critical: '❌'
    }[result.status];
    
    console.log(`${statusIcon} ${service.name}: ${result.status.toUpperCase()} (${result.responseTime}ms)`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    
    switch (result.status) {
      case 'healthy':
        results.overall.healthy++;
        break;
      case 'warning':
        results.overall.warning++;
        break;
      case 'critical':
        results.overall.critical++;
        break;
    }
  }
  
  results.duration = Date.now() - startTime;
  
  if (results.overall.critical > 0) {
    results.overall.status = 'critical';
  } else if (results.overall.warning > 0) {
    results.overall.status = 'warning';
  } else {
    results.overall.status = 'healthy';
  }
}

function generateReport() {
  console.log('\n' + '='.repeat(60));
  log('HEALTH CHECK SUMMARY', 'info');
  console.log('='.repeat(60));
  
  const overallIcon = {
    healthy: '✅',
    warning: '⚠️',
    critical: '❌'
  }[results.overall.status];
  
  console.log(`${overallIcon} Overall Status: ${results.overall.status.toUpperCase()}`);
  console.log(`📊 Services: ${results.overall.healthy} healthy, ${results.overall.warning} warning, ${results.overall.critical} critical`);
  console.log(`⏱️  Total Check Time: ${results.duration}ms`);
  
  if (results.overall.status !== 'healthy') {
    console.log('\n💡 Recommendations:');
    console.log('   • Check service logs: docker-compose logs -f');
    console.log('   • Restart services: docker-compose restart');
    console.log('   • Full reset: docker-compose down && docker-compose up -d');
  }
  
  console.log('\n' + '='.repeat(60));
}

async function main() {
  try {
    await runHealthChecks();
    generateReport();
    
    const exitCode = results.overall.status === 'critical' ? 1 : 0;
    process.exit(exitCode);
    
  } catch (error) {
    log(`Health check failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };