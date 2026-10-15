const https = require("https");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function test() {
  const c = await fetchUrl("https://cobephim.cfd/_next/static/chunks/1684-274edab2df520bfd.js");
  console.log("Chunk 1684 has 0cc777:", c.data.includes("0cc777"));
  console.log("Chunk 1684 has 6518:", c.data.includes("6518"));

  const c2 = await fetchUrl("https://cobephim.cfd/_next/static/chunks/4bd1b696-5f86aba2e81e6d16.js");
  console.log("Chunk 4bd1 has 0cc777:", c2.data.includes("0cc777"));
  console.log("Chunk 4bd1 has 6518:", c2.data.includes("6518"));
}

test().catch(console.error);
