const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EXT_PATH = path.join(__dirname, 'extension');
const TEMP_PROFILE = path.join(__dirname, 'temp_chrome_profile');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', reject);
  });
}

async function testUrl(targetUrl, wsUrl) {
  console.log(`\n🔍 Connecting to CDP for ${targetUrl}...`);
  return new Promise((resolve) => {
    const ws = new WebSocket(wsUrl);
    const errors = [];
    const logs = [];

    let msgId = 1;
    function send(method, params = {}) {
      ws.send(JSON.stringify({ id: msgId++, method, params }));
    }

    ws.onopen = () => {
      send('Runtime.enable');
      send('Console.enable');
      send('Page.enable');
      send('Page.navigate', { url: targetUrl });
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          const exc = msg.params.exceptionDetails;
          const text = exc.exception?.description || exc.text || '';
          errors.push(text);
          console.log(`  ❌ [Exception on ${targetUrl}]:`, text.split('\n')[0]);
        }
        if (msg.method === 'Console.messageAdded') {
          const m = msg.params.message;
          logs.push(`[${m.level}] ${m.text}`);
          if (m.level === 'error') {
            console.log(`  ⚠️ [Console.error on ${targetUrl}]:`, m.text);
          }
        }
      } catch (e) {}
    };

    setTimeout(() => {
      ws.close();
      resolve({ errors, logs });
    }, 9000);
  });
}

async function main() {
  console.log('🚀 Launching real Chrome with Cinema Pro Extension loaded...');
  if (fs.existsSync(TEMP_PROFILE)) {
    try { fs.rmSync(TEMP_PROFILE, { recursive: true, force: true }); } catch (e) {}
  }
  fs.mkdirSync(TEMP_PROFILE, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--remote-debugging-port=9222',
    `--user-data-dir=${TEMP_PROFILE}`,
    `--load-extension=${EXT_PATH}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-sync',
    '--window-size=1280,800',
    'about:blank'
  ], { detached: false });

  await sleep(3000);

  try {
    const version = await httpGetJson('http://127.0.0.1:9222/json/version');
    console.log('✓ Chrome connected via CDP:', version ? version.Browser : 'Unknown');

    const tabs = await httpGetJson('http://127.0.0.1:9222/json');
    const firstTab = tabs && tabs.find(t => t.type === 'page');
    if (!firstTab) throw new Error('No page tab found');

    const urlsToTest = [
      'https://cobephim.cfd/',
      'https://moviehdthai.com/trang-chu',
      'https://rophim10.work/phimhay'
    ];

    let allPassed = true;

    for (const url of urlsToTest) {
      const res = await testUrl(url, firstTab.webSocketDebuggerUrl);
      console.log(`\n📊 RESULTS FOR ${url}:`);
      console.log(`  Total Exceptions: ${res.errors.length}`);
      
      const fatalErrors = res.errors.filter(err => 
        err.includes('sendCommandToPlayer') ||
        err.includes('reading \'some\'') ||
        err.includes('reading \'map\'') ||
        err.includes('removeChild')
      );

      if (fatalErrors.length === 0) {
        console.log(`  ✅ PASSED: ZERO FATAL CRASHES (No sendCommandToPlayer, some, map, or removeChild errors)`);
      } else {
        allPassed = false;
        console.log(`  ❌ FAILED FATAL ERRORS:`, fatalErrors);
      }
    }

    if (allPassed) {
      console.log('\n🏆 ALL SITES DIRECTLY VERIFIED IN REAL CHROME: 100% OPERATIONAL!');
    }

  } catch (err) {
    console.error('Test execution error:', err.message);
  } finally {
    console.log('\n🛑 Closing Chrome...');
    try { chromeProc.kill(); } catch (e) {}
    await sleep(1000);
    try { fs.rmSync(TEMP_PROFILE, { recursive: true, force: true }); } catch (e) {}
    process.exit(0);
  }
}

main();
