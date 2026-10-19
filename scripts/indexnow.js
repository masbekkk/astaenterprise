/**
 * IndexNow Fast Indexing Push Script
 * Automatically notifies Bing, Yandex, Naver, and allied search engines when URLs are updated.
 *
 * Usage:
 *   node scripts/indexnow.js
 *   node scripts/indexnow.js --dry-run
 */

const https = require('https');

const HOST = 'astaenterprise.id';
const KEY = 'c4a9b8f2d1e04753a8123efb092147ac';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/en`
];

const PAYLOAD = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST
};

async function submitIndexNow(endpointHost, endpointPath) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(PAYLOAD);

    const options = {
      hostname: endpointHost,
      port: 443,
      path: endpointPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AstaEnterprise-IndexNow-Notifier/1.0'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({
            endpoint: endpointHost,
            statusCode: res.statusCode,
            message: 'Successfully submitted URLs to IndexNow'
          });
        } else {
          resolve({
            endpoint: endpointHost,
            statusCode: res.statusCode,
            message: data || res.statusMessage
          });
        }
      });
    });

    req.on('error', (err) => {
      reject({ endpoint: endpointHost, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({ endpoint: endpointHost, error: 'Request timeout after 10s' });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('⚡ IndexNow Protocol Trigger for AstaEnterprise');
  console.log(`🌐 Host: ${HOST}`);
  console.log(`🔑 Key Location: ${KEY_LOCATION}`);
  console.log(`📄 URLs (${URL_LIST.length}):\n  - ${URL_LIST.join('\n  - ')}\n`);

  if (process.argv.includes('--dry-run')) {
    console.log('🔍 DRY RUN active: Payload prepared successfully without sending HTTP requests.');
    console.log(JSON.stringify(PAYLOAD, null, 2));
    return;
  }

  const endpoints = [
    { host: 'api.indexnow.org', path: '/indexnow' },
    { host: 'www.bing.com', path: '/indexnow' }
  ];

  for (const ep of endpoints) {
    try {
      console.log(`📡 Pinging ${ep.host}...`);
      const result = await submitIndexNow(ep.host, ep.path);
      console.log(`✅ [${result.endpoint}] Response (${result.statusCode}): ${result.message}`);
    } catch (err) {
      console.warn(`⚠️ [${err.endpoint}] Failed to ping:`, err.error || err);
    }
  }

  console.log('\n🎉 IndexNow submission completed!');
}

run().catch((e) => {
  console.error('❌ Error executing IndexNow script:', e);
  process.exit(1);
});
