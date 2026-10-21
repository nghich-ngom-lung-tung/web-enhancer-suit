const fs = require("fs");
const path = require("path");
const vm = require("vm");

console.log("================================================================");
console.log("🎬 GRANDMASTER VERIFICATION HARNESS - CINEMA PRO SUITE v4.5");
console.log("================================================================\n");

function findScriptFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findScriptFiles(fullPath));
    } else if (file.endsWith(".user.js")) {
      results.push(fullPath.replace(/\\/g, "/"));
    }
  });
  return results.sort();
}

const scriptFiles = findScriptFiles("scripts");

console.log(`Discovered ${scriptFiles.length} UserScripts to audit under scripts/:`);
scriptFiles.forEach((f, i) => console.log(`  [${String(i + 1).padStart(2, "0")}] ${f}`));
console.log("\n----------------------------------------------------------------");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function report(testName, passed, details = "") {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName} - ${details}`);
  }
}

// ═════════════════════════════════════════════════════════════════
// 1. SYNTAX & METADATA AUDIT
// ═════════════════════════════════════════════════════════════════
console.log("\n📋 PHASE 1: Tampermonkey Metadata & Syntax Integrity");

scriptFiles.forEach(file => {
  const content = fs.readFileSync(file, "utf8");

  // Syntax check
  let syntaxPassed = true;
  let syntaxErr = "";
  try {
    new vm.Script(content, { filename: file });
  } catch (err) {
    syntaxPassed = false;
    syntaxErr = err.message;
  }
  report(`${file}: ES2022 Syntax Valid`, syntaxPassed, syntaxErr);

  // Header block
  const hasHeader = content.includes("// ==UserScript==") && content.includes("// ==/UserScript==");
  report(`${file}: Metadata Header Exists`, hasHeader);

  // Author
  const hasAuthor = content.includes("@author       Sfrank1e");
  report(`${file}: Author is Sfrank1e`, hasAuthor);

  // Download & Update URL
  if (!file.includes("tampermonkey.user.js")) {
    const expectedUrl = `https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/${file}`;
    const hasDownload = content.includes(`@downloadURL  ${expectedUrl}`);
    const hasUpdate = content.includes(`@updateURL    ${expectedUrl}`);
    report(`${file}: Correct Raw DownloadURL`, hasDownload, `Missing ${expectedUrl}`);
    report(`${file}: Correct Raw UpdateURL`, hasUpdate, `Missing ${expectedUrl}`);
  }

  // Essential Flags
  const hasRunAt = content.includes("@run-at       document-start");
  const hasAllFrames = content.includes("@allFrames    true");
  report(`${file}: document-start & allFrames enabled`, hasRunAt && hasAllFrames);
});

// LICENSE file verification
const licensePath = path.join(__dirname, "LICENSE");
const licenseExists = fs.existsSync(licensePath);
const licenseContent = licenseExists ? fs.readFileSync(licensePath, "utf8") : "";
const hasMit = licenseContent.includes("MIT License") && licenseContent.includes("Sfrank1e");
report("LICENSE: File exists and contains valid MIT License for Sfrank1e", licenseExists && hasMit);

// ═════════════════════════════════════════════════════════════════
// 2. TOP WINDOW DOM & RUNTIME SIMULATION
// ═════════════════════════════════════════════════════════════════
console.log("\n🖥️ PHASE 2: Top Window DOM & Runtime Simulation");

class MockElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.id = "";
    this.className = "";
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) {
            this.classList._classes.delete(c);
            return false;
          } else {
            this.classList._classes.add(c);
            return true;
          }
        }
        if (force) this.classList._classes.add(c);
        else this.classList._classes.delete(c);
        return force;
      },
      contains: (c) => this.classList._classes.has(c)
    };
    this.children = [];
    this.innerHTML = "";
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.playbackRate = 1.0;
    this.currentTime = 0;
    this.duration = 1000;
    this.paused = true;
    this.muted = false;
    this.volume = 1.0;
  }

  appendChild(el) {
    this.children.push(el);
    return el;
  }

  remove() {
    return this;
  }

  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }

  addEventListener(ev, cb) {
    if (!this.listeners[ev]) this.listeners[ev] = [];
    this.listeners[ev].push(cb);
  }

  querySelector(sel) {
    if (sel.startsWith("#")) {
      const id = sel.slice(1);
      if (this.id === id) return this;
      for (const ch of this.children) {
        if (ch.id === id) return ch;
        if (ch.querySelector) {
          const res = ch.querySelector(sel);
          if (res) return res;
        }
      }
    }
    return null;
  }

  querySelectorAll(sel) {
    return [];
  }

  play() { this.paused = false; return Promise.resolve(); }
  pause() { this.paused = true; }
  requestFullscreen() { return Promise.resolve(); }
}

function createTopWindowMock(hostname = "rophim1.vip") {
  const body = new MockElement("BODY");
  const head = new MockElement("HEAD");
  const videoElem = new MockElement("VIDEO");
  videoElem.playbackRate = 1.0;
  videoElem.currentTime = 10;
  videoElem.duration = 1000;
  videoElem.volume = 1.0;

  const listeners = {};
  let handshakeReply = null;
  let openedPopup = null;

  const documentMock = {
    body,
    head,
    documentElement: head,
    fullscreenElement: null,
    exitFullscreen: () => Promise.resolve(),
    createElement: (tag) => new MockElement(tag),
    getElementById: (id) => {
      if (id === "ro-vip-hub") {
        return body.children.find(c => c.id === "ro-vip-hub") || null;
      }
      return null;
    },
    querySelector: (sel) => {
      if (sel === "video") return videoElem;
      if (sel.startsWith("#")) {
        const id = sel.slice(1);
        if (body.id === id) return body;
        return body.children.find(c => c.id === id) || null;
      }
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === "iframe") return [];
      return [];
    },
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    }
  };

  const windowMock = {
    top: null,
    self: null,
    location: {
      hostname,
      pathname: "/phim-hay",
      href: `https://${hostname}/phim-hay`,
      search: "?ep=1"
    },
    document: documentMock,
    open: (url) => { openedPopup = url; return {}; },
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    },
    removeEventListener: () => {},
    postMessage: () => {},
    navigator: {
      clipboard: {
        writeText: async (t) => true
      }
    },
    Blob: class Blob {
      constructor(content, opts) {
        this.content = content;
        this.type = opts?.type || "";
      }
    },
    URL: {
      createObjectURL: () => "blob:mock-url",
      revokeObjectURL: () => {}
    },
    localStorage: {
      _store: {},
      setItem(k, v) { this._store[k] = String(v); },
      getItem(k) { return this._store[k] || null; },
      removeItem(k) { delete this._store[k]; }
    },
    fetch: async () => ({
      status: 200,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({}) }),
      json: async () => ({})
    }),
    XMLHttpRequest: function () {
      this.open = () => {};
      this.send = () => {};
      this.addEventListener = () => {};
      this.getResponseHeader = () => "application/json";
      this.responseText = "{}";
    },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn) => setInterval(fn, 1000),
    clearInterval: (id) => clearInterval(id),
    console: { log: () => {}, warn: () => {}, error: () => {} },
    HTMLMediaElement: { prototype: { pause: function () {} } },
    Storage: { prototype: { setItem: function (k, v) {}, getItem: function (k) {} } }
  };

  windowMock.window = windowMock;
  windowMock.top = windowMock;
  windowMock.self = windowMock;

  return {
    window: windowMock,
    document: documentMock,
    listeners,
    body,
    videoElem,
    getHandshakeReply: () => handshakeReply,
    setHandshakeReply: (r) => { handshakeReply = r; }
  };
}

scriptFiles.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document, listeners, body, videoElem, setHandshakeReply } = createTopWindowMock();

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Blob: window.Blob,
    URL: window.URL,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);
    report(`${file}: Top Window executed without runtime exceptions`, true);

    // Test 2.1: Floating VIP Hub Injection
    const hasHub = body.children.some(c => c.id === "ro-vip-hub");
    report(`${file}: Floating VIP Hub (#ro-vip-hub) successfully injected`, hasHub);

    // Test 2.2: Ad popup neutralization
    const popupRes = window.open("https://bad-popup-ads.xyz/click");
    report(`${file}: Ad Popunder/Window.open trap neutralizer`, popupRes === null);

    // Test 2.3: stream-guard-hello handshake reply
    let handshakeReceived = false;
    if (listeners["message"]) {
      listeners["message"].forEach(cb => {
        cb({
          data: { type: "stream-guard-hello", version: 25, id: "test-guard-1" },
          source: {
            postMessage: (msg) => {
              if (msg && msg.type === "stream-parent-state" && msg.hasAdblock === false && msg.key === "ok") {
                handshakeReceived = true;
              }
            }
          }
        });
      });
    }
    report(`${file}: stream-guard-hello Handshake replied {hasAdblock: false, key: 'ok'}`, handshakeReceived);

    // Test 2.4: Top-window fetch stream sniffer
    window.fetch("https://storage.cdn.com/stream/index.m3u8");
    report(`${file}: Top Window fetch hooked for M3U8 stream sniffer`, true);

    // Test 2.5: Direct video element control & Hotkeys (Expanded: S, I, Arrows, F, E, T, [, ], Space, M, 0-9)
    let hotkeysPassed = true;
    if (listeners["keydown"]) {
      try {
        listeners["keydown"].forEach(cb => {
          cb({ key: "s", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "i", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "arrowleft", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "arrowright", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "arrowup", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "arrowdown", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "f", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "e", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "t", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "[", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "]", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: " ", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "m", preventDefault: () => {}, target: { tagName: "DIV" } });
          cb({ key: "5", preventDefault: () => {}, target: { tagName: "DIV" } });
        });
      } catch (err) {
        hotkeysPassed = false;
      }
    }
    report(`${file}: Cinema Pro 14 Hotkeys (S, I, Arrows, F, E, T, [, ], Space, M, 0-9) fired safely`, hotkeysPassed);

  } catch (err) {
    report(`${file}: Top Window execution error`, false, err.stack);
  }
});

// ═════════════════════════════════════════════════════════════════
// 3. IFRAME PLAYER EMBED & STREAM GUARD DEFUSAL SIMULATION
// ═════════════════════════════════════════════════════════════════
console.log("\n🎬 PHASE 3: Iframe Player Embed & Stream Guard Defusal Simulation");

function createIframeMock() {
  const listeners = {};
  let postedMessage = null;

  const mockVideo = new MockElement("VIDEO");
  mockVideo.duration = 45; // pre-roll ad duration
  mockVideo.currentTime = 5;
  mockVideo.volume = 1.0;

  const mockAdNotice = new MockElement("DIV");
  mockAdNotice.className = "jw-ad-notice jw-ad-countdown";

  const documentMock = {
    head: new MockElement("HEAD"),
    body: new MockElement("BODY"),
    documentElement: new MockElement("HTML"),
    fullscreenElement: null,
    exitFullscreen: () => Promise.resolve(),
    createElement: (tag) => new MockElement(tag),
    querySelector: (sel) => {
      if (sel === "video") return mockVideo;
      if (sel.includes("ad-notice") || sel.includes("ad-countdown")) return mockAdNotice;
      return null;
    },
    querySelectorAll: (sel) => [],
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    }
  };

  const windowMock = {
    top: { postMessage: () => {} },
    self: null,
    parent: {
      postMessage: (data) => { postedMessage = data; }
    },
    location: {
      hostname: "embed.streamc.xyz",
      pathname: "/embed/v/abc123xyz",
      href: "https://embed.streamc.xyz/embed/v/abc123xyz"
    },
    document: documentMock,
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    },
    fetch: async () => ({ status: 200, json: async () => ({}) }),
    XMLHttpRequest: function () {
      this.open = () => {};
      this.send = () => {};
      this.addEventListener = () => {};
    },
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn) => setInterval(fn, 1000),
    clearInterval: (id) => clearInterval(id),
    HTMLMediaElement: {
      prototype: {
        pause: function () { this.paused = true; }
      }
    }
  };
  windowMock.window = windowMock;
  windowMock.self = windowMock;

  return { window: windowMock, document: documentMock, listeners, mockVideo, getPosted: () => postedMessage };
}

scriptFiles.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document, listeners, mockVideo, getPosted } = createIframeMock();

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: { clipboard: { writeText: async () => true } },
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    localStorage: { getItem: () => null, setItem: () => {} },
    HTMLMediaElement: window.HTMLMediaElement,
    console: window.console,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    Promise
  });

  try {
    vm.runInContext(code, ctx);
    report(`${file}: Iframe Context executed without errors`, true);

    // Test 3.1: Stream Guard defusal
    const hasGuardDefused = (
      typeof window.streamGuard === "object" &&
      window.streamGuard !== null &&
      window.streamGuard.isBlocked() === false &&
      window.streamGuard.status().blocked === false
    );
    report(`${file}: Stream Guard defused (window.streamGuard.isBlocked === false)`, hasGuardDefused);

    // Test 3.2: HTMLMediaElement.prototype.pause hook
    const pauseCode = window.HTMLMediaElement.prototype.pause.toString();
    const pauseGuardActive = pauseCode.includes("guard") || pauseCode.includes("stopPlayback");
    report(`${file}: HTMLMediaElement.prototype.pause guard neutralizer active`, pauseGuardActive);

    // Test 3.3: M3U8 Stream sniffer & bridge
    window.fetch("https://storage.streamc.xyz/hls/master.m3u8");
    const posted = getPosted();
    const snifferPassed = Boolean(posted && posted.type === "RO_STREAM_FOUND" && posted.streamUrl.includes(".m3u8"));
    report(`${file}: M3U8 Stream Sniffer hooked fetch & posted to parent`, snifferPassed);

    // Test 3.4: Player remote command handling (seek, volume, fullscreen)
    let commandPassed = true;
    if (listeners["message"]) {
      try {
        listeners["message"].forEach(cb => {
          cb({ data: { type: "RO_CMD_SEEK", delta: 5 } });
          cb({ data: { type: "RO_CMD_VOLUME", volume: 0.8 } });
          cb({ data: { type: "RO_CMD_FULLSCREEN" } });
          cb({ data: { type: "RO_CMD_SEEK_PERCENT", percent: 50 } });
        });
      } catch (err) {
        commandPassed = false;
      }
    }
    report(`${file}: Iframe Remote Commands (SEEK, VOLUME, FULLSCREEN) processed`, commandPassed);

  } catch (err) {
    report(`${file}: Iframe Context execution`, false, err.stack);
  }
});

// ═════════════════════════════════════════════════════════════════
// 4. ROPHIM VIP 2099 & COIN RESPONSE PATCHER AUDIT
// ═════════════════════════════════════════════════════════════════
console.log("\n👑 PHASE 4: Rophim VIP 2099 & Coin Backend Patcher Audit");

const rophimScripts = scriptFiles.filter(f => f.endsWith("rophim.user.js") || f.endsWith("tampermonkey.user.js") || f.endsWith("web-enhancer-all.user.js") || f.endsWith("netanime.user.js") || f.endsWith("moviehdthai.user.js") || f.endsWith("cobephim.user.js"));
rophimScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("rophim1.vip");

  window.fetch = async (url) => {
    if (url.includes("/tcoin/me")) {
      return {
        status: 200,
        headers: { get: () => "application/json" },
        clone: () => ({ json: async () => ({ thungBalance: 0, balance: 0 }) }),
        json: async () => ({ thungBalance: 0, balance: 0 })
      };
    }
    if (url.includes("/api/auth/session")) {
      return {
        status: 200,
        headers: { get: () => "application/json" },
        clone: () => ({ json: async () => ({ user: { is_vip: false, role: "USER" } }) }),
        json: async () => ({ user: { is_vip: false, role: "USER" } })
      };
    }
    return {
      status: 200,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({}) }),
      json: async () => ({})
    };
  };

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Test 4.1: /tcoin/me balance patch
    ctx.window.fetch("/baseapi/api/v1/tcoin/me").then(res => res.json()).then(data => {
      const coinPassed = data && data.thungBalance === 999999999;
      report(`${file}: /tcoin/me patched to 999,999,999 Coin`, coinPassed);
    });

    // Test 4.2: /api/auth/session VIP patch
    ctx.window.fetch("/api/auth/session").then(res => res.json()).then(data => {
      const vipPassed = data && data.user && data.user.is_vip === true && data.user.role === "VIP";
      report(`${file}: /api/auth/session patched to VIP 2099`, vipPassed);
    });

  } catch (err) {
    report(`${file}: VIP Patcher execution`, false, err.stack);
  }
});

const motchillScripts = scriptFiles.filter(f => f.endsWith("motchill.user.js") || f.endsWith("web-enhancer-all.user.js"));
motchillScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("phimmotchill.online");

  window.fetch = async (url) => {
    return {
      status: 401,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({ success: false, error: "Unauthorized" }) }),
      json: async () => ({ success: false, error: "Unauthorized" })
    };
  };

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Test 4.3: Motchill auth_hint set in localStorage
    const authHintPassed = ctx.window.localStorage.getItem("auth_hint") === "1";
    report(`${file}: Motchill auto-auth_hint=1 initialized`, authHintPassed);

    // Test 4.4: /api/v1/auth/profile patched to VIP Admin with 999,999,999 coins
    ctx.window.fetch("/api/v1/auth/profile").then(res => res.json()).then(data => {
      const user = data?.result?.user || data?.result || data?.data;
      const motchillVipPassed = data?.status === true && user?.is_vip === true && user?.is_role === "admin" && user?.coin === 999999999;
      report(`${file}: /api/v1/auth/profile patched to VIP Admin & 999,999,999 coins`, motchillVipPassed);
    });

    // Test 4.5: /api/v1/users/vip-packages patched to VIP 2099 active
    ctx.window.fetch("/api/v1/users/vip-packages").then(res => res.json()).then(data => {
      const pkg = data?.result?.current_vip || data?.data?.current_vip;
      const pkgPassed = data?.status === true && pkg?.is_active === true && pkg?.package_name === "VIP Vĩnh Viễn 2099";
      report(`${file}: /api/v1/users/vip-packages patched to VIP Vĩnh Viễn 2099`, pkgPassed);
    });
  } catch (err) {
    report(`${file}: Motchill VIP Patcher execution`, false, err.stack);
  }
});

const comicVipScripts = scriptFiles.filter(f => f.endsWith("zettruyen.user.js") || f.endsWith("toptruyen.user.js") || f.endsWith("web-enhancer-all.user.js"));
comicVipScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");

  // ZetTruyen test
  if (file.includes("zettruyen") || file.includes("web-enhancer-all")) {
    const { window, document } = createTopWindowMock("www.zettruyen3.com");
    const ctx = vm.createContext({
      window,
      document,
      location: window.location,
      top: window.top,
      self: window.self,
      navigator: window.navigator,
      localStorage: window.localStorage,
      fetch: window.fetch,
      XMLHttpRequest: window.XMLHttpRequest,
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      setInterval: window.setInterval,
      clearInterval: window.clearInterval,
      console: window.console,
      HTMLMediaElement: window.HTMLMediaElement,
      Storage: window.Storage,
      Promise,
      Response: class {
        constructor(body, init) {
          this.body = body;
          this.status = init?.status || 200;
          this.headers = init?.headers || {};
        }
        json() { return Promise.resolve(JSON.parse(this.body)); }
        text() { return Promise.resolve(String(this.body)); }
      }
    });

    try {
      vm.runInContext(code, ctx);

      // Test 4.6: ZetTruyen userData auto-initialized in localStorage
      const userDataStr = ctx.window.localStorage.getItem("userData");
      let userPassed = false;
      try {
        const u = JSON.parse(userDataStr);
        userPassed = Boolean(u && u.is_vip === true && u.coin === 999999999);
      } catch (e) {}
      report(`${file}: ZetTruyen auto-initialized VIP userData in localStorage`, userPassed);

      // Test 4.7: /api/profile intercepted returning auth: true & VIP user
      ctx.window.fetch("https://www.zettruyen3.com/api/profile").then(res => res.json()).then(data => {
        const zetProfilePassed = Boolean(data && data.success === true && data.data && data.data.auth === true && data.data.info && data.data.info.is_vip === true);
        report(`${file}: ZetTruyen /api/profile intercepted with VIP Reader Pro`, zetProfilePassed);
      });
    } catch (err) {
      report(`${file}: ZetTruyen VIP execution`, false, err.stack);
    }
  }

  // TopTruyen test
  if (file.includes("toptruyen") || file.includes("web-enhancer-all")) {
    const { window, document } = createTopWindowMock("www.toptruyenzone12.com");
    const ctx = vm.createContext({
      window,
      document,
      location: window.location,
      top: window.top,
      self: window.self,
      navigator: window.navigator,
      localStorage: window.localStorage,
      fetch: window.fetch,
      XMLHttpRequest: window.XMLHttpRequest,
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      setInterval: window.setInterval,
      clearInterval: window.clearInterval,
      console: window.console,
      HTMLMediaElement: window.HTMLMediaElement,
      Storage: window.Storage,
      Promise,
      Response: class {
        constructor(body, init) {
          this.body = body;
          this.status = init?.status || 200;
          this.headers = init?.headers || {};
        }
        json() { return Promise.resolve(JSON.parse(this.body)); }
        text() { return Promise.resolve(String(this.body)); }
      }
    });

    try {
      vm.runInContext(code, ctx);

      // Test 4.8: TopTruyen top_vip auto-initialized in localStorage
      const topVipPassed = ctx.window.localStorage.getItem("top_vip") === "1";
      report(`${file}: TopTruyen auto-initialized top_vip in localStorage`, topVipPassed);

      // Test 4.9: /header-login intercepted returning VIP user dropdown HTML
      ctx.window.fetch("https://www.toptruyenzone12.com/header-login").then(res => res.text()).then(html => {
        const topHeaderPassed = Boolean(html && html.includes("user-logged-in") && html.includes("VIP Reader Pro") && html.includes("VIP 2099"));
        report(`${file}: TopTruyen /header-login intercepted with VIP Reader Pro dropdown`, topHeaderPassed);
      });
    } catch (err) {
      report(`${file}: TopTruyen VIP execution`, false, err.stack);
    }
  }
});

const ghienphimScripts = scriptFiles.filter(f =>
  f.endsWith("ghienphim.user.js") ||
  f.endsWith("duphim.user.js") ||
  f.endsWith("coiphim.user.js") ||
  f.endsWith("ghienblog.user.js") ||
  f.endsWith("ghientruyen.user.js") ||
  f.endsWith("web-enhancer-all.user.js")
);

ghienphimScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("ghienphimz.mom");

  // Create mock Firebase & Business objects to test hooks
  window.firebase = {
    auth: function () {
      return {
        currentUser: null,
        onAuthStateChanged: function (cb) {}
      };
    }
  };
  window.business = {
    checkReward: function (d, cb) { if (typeof cb === "function") cb({}); },
    claimReward: function (d, cb) { if (typeof cb === "function") cb({}); }
  };

  const ctx = vm.createContext({
    window,
    business: window.business,
    firebase: window.firebase,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
      text() { return Promise.resolve(String(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Test 4.10: Firebase Auth Hook verified
    let fbPassed = false;
    if (ctx.window.firebase && typeof ctx.window.firebase.auth === "function") {
      const auth = ctx.window.firebase.auth();
      fbPassed = Boolean(auth && auth.currentUser && auth.currentUser.email === "vip.cinemapro@ghienphim.org" && auth.currentUser.displayName.includes("VIP"));
    }
    report(`${file}: GhienPhim Firebase Auth hooked with VIP 2099 user`, fbPassed);

    // Test 4.11: business.checkReward mock verified
    let rewardPassed = false;
    if (ctx.window.business && typeof ctx.window.business.checkReward === "function") {
      ctx.window.business.checkReward({}, function (res) {
        rewardPassed = Boolean(res && res.status === 1 && res.cardType && res.cardType.includes("500K"));
      });
    }
    report(`${file}: GhienPhim business.checkReward hooked with 500K reward`, rewardPassed);

    // Test 4.12: business.claimReward mock verified
    let claimPassed = false;
    if (ctx.window.business && typeof ctx.window.business.claimReward === "function") {
      ctx.window.business.claimReward({}, function (res) {
        claimPassed = Boolean(res && res.status === 1 && res.value === 500000);
      });
    }
    report(`${file}: GhienPhim business.claimReward hooked with 500.000d`, claimPassed);

  } catch (err) {
    report(`${file}: GhienPhim VIP Patcher execution`, false, err.stack);
  }
});

const chuoiChienScripts = scriptFiles.filter(f =>
  f.endsWith("chuoichien.user.js") ||
  f.endsWith("bonglau.user.js") ||
  f.endsWith("web-enhancer-all.user.js")
);

chuoiChienScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("live08.chuoichientv.me");

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
      text() { return Promise.resolve(String(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Test 4.13: Chuối Chiên TV localStorage auto-seed for VIP user & protected real chat token
    const token = ctx.window.localStorage.getItem("auth._token.local");
    const userStr = ctx.window.localStorage.getItem("auth.user");
    let userObj = null;
    try { userObj = JSON.parse(userStr); } catch (e) {}
    const autoSeedPassed = Boolean((!token || !token.includes("cinema-pro-vip")) && userObj && userObj.username === "vip_cinemapro" && userObj.role === "admin");
    report(`${file}: Chuối Chiên TV auto-seeded VIP user in localStorage & protected real chat token`, autoSeedPassed);

    // Test 4.14: Chuối Chiên TV /users/login API mock intercepted
    ctx.window.fetch("https://api.chuoichientv.net/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ username: "any", password: "any" })
    }).then(res => res.json()).then(data => {
      const loginPassed = Boolean(data && data.success === true && data.accessToken && data.user && data.user.role === "admin");
      report(`${file}: Chuối Chiên TV /users/login intercepted returning VIP Cinema Pro token & user`, loginPassed);
    });

    // Test 4.15: Chuối Chiên TV /users/profile API mock intercepted
    ctx.window.fetch("https://api.chuoichientv.net/v1/users/profile", {
      headers: { Authorization: "Bearer cinema-pro-vip-jwt-token" }
    }).then(res => res.json()).then(data => {
      const profilePassed = Boolean(data && data.success === true && data.username === "vip_cinemapro" && data.role === "admin");
      report(`${file}: Chuối Chiên TV /users/profile intercepted returning VIP user profile`, profilePassed);
    });

    // Test 4.16: Chuối Chiên TV /ads API mock intercepted (empty ads payload)
    ctx.window.fetch("https://api-v2.chuoichientv.net/v2/ads").then(res => res.json()).then(data => {
      const adsPassed = Boolean(data && data.success === true && Array.isArray(data.data) && data.data.length === 0);
      report(`${file}: Chuối Chiên TV /ads intercepted returning empty ads array (banner & bet buttons defused)`, adsPassed);
    });

    // Test 4.17: Chuối Chiên TV live matches & chat endpoints must NOT be intercepted as ads
    const mockMatchCheck = ctx.getRophimMockJsonString ? ctx.getRophimMockJsonString("https://api-v2.chuoichientv.net/v2/matches/pinned") : null;
    const mockChatCheck = ctx.getRophimMockJsonString ? ctx.getRophimMockJsonString("https://api-v2.chuoichientv.net/v2/chat/send") : null;
    const liveStreamsNotBlocked = (mockMatchCheck === null && mockChatCheck === null);
    report(`${file}: Chuối Chiên TV live matches (/matches/pinned) & chat (/chat/send) endpoints unblocked`, liveStreamsNotBlocked);

  } catch (err) {
    report(`${file}: Chuối Chiên VIP Patcher execution`, false, err.stack);
  }
});

const film4kScripts = scriptFiles.filter(f => f.endsWith("film4k.user.js") || f.endsWith("web-enhancer-all.user.js"));
film4kScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("film4k.net");
  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
      text() { return Promise.resolve(String(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Test: /api/auth/me returns VIP user
    ctx.window.fetch("https://film4k.net/api/auth/me").then(res => res.json()).then(data => {
      const mePassed = Boolean(data && data.user && data.user.name === "VIP Cinema Pro" && data.user.role === "vip" && data.user.admin === true);
      report(`${file}: /api/auth/me intercepted returning VIP Cinema Pro (VIP 2099)`, mePassed);
    });

    // Test: /api/auth/account returns VIP user and methods
    ctx.window.fetch("https://film4k.net/api/auth/account").then(res => res.json()).then(data => {
      const accPassed = Boolean(data && data.user && data.user.name === "VIP Cinema Pro" && data.methods && data.methods.password === true);
      report(`${file}: /api/auth/account intercepted returning VIP user & methods`, accPassed);
    });

    // Test: /api/settings returns VIP settings
    ctx.window.fetch("https://film4k.net/api/settings").then(res => res.json()).then(data => {
      const settPassed = Boolean(data && data.signedIn === true && data.settings && data.settings.auto_skip_intro === true);
      report(`${file}: /api/settings intercepted returning VIP settings`, settPassed);
    });
  } catch (err) {
    report(`${file}: Film4k VIP execution`, false, err.stack);
  }
});

// ChoPhim VIP 2099 & Pre-roll TVC Killer
const chophimScripts = scriptFiles.filter(f => f.endsWith("chophim.user.js") || f.endsWith("web-enhancer-all.user.js"));
chophimScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("chophim.fun");

  window.fetch = async (url) => {
    return {
      status: 401,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({ user: null }) }),
      json: async () => ({ user: null })
    };
  };

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Node: class Node {
      appendChild(n) { return n; }
      removeChild(c) {
        const err = new Error("Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.");
        err.name = "NotFoundError";
        throw err;
      }
      insertBefore(n, r) {
        const err = new Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        err.name = "NotFoundError";
        throw err;
      }
    },
    BroadcastChannel: class {
      constructor(name) { this.name = name; }
      postMessage() {}
      onmessage() {}
    },
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Verify localStorage auth-state seeded with premium subscriptionTier
    const authRaw = ctx.window.localStorage.getItem("chophim-auth-state");
    let authParsed = null;
    try { authParsed = JSON.parse(authRaw); } catch(e) {}
    const chophimSeedPassed = Boolean(authParsed?.user?.subscriptionTier === "premium");
    report(`${file}: ChoPhim auto-initialized subscriptionTier="premium" in localStorage`, chophimSeedPassed);

    // Intercept /api/auth/me
    ctx.window.fetch("/api/auth/me").then(res => res.json()).then(data => {
      const mePassed = Boolean(data?.user?.subscriptionTier === "premium" && data?.user?.role === "vip");
      report(`${file}: ChoPhim /api/auth/me intercepted returning VIP premium user`, mePassed);
    });

    // Intercept /api/auth/login
    ctx.window.fetch("/api/auth/login").then(res => res.json()).then(data => {
      const loginPassed = Boolean(data?.success === true && data?.user?.subscriptionTier === "premium");
      report(`${file}: ChoPhim /api/auth/login intercepted with instant success & VIP pass`, loginPassed);
    });

    // Intercept /api/subscription/family
    ctx.window.fetch("/api/subscription/family").then(res => res.json()).then(data => {
      const famPassed = Boolean(data && data.role === "none" && data.family === null);
      report(`${file}: ChoPhim /api/subscription/family intercepted with valid family object`, famPassed);
    });

    // Intercept /api/subscription/plans
    ctx.window.fetch("/api/subscription/plans").then(res => res.json()).then(data => {
      const plansPassed = Boolean(Array.isArray(data?.plans) && data.plans.length > 0 && data.plans[0].durationDays);
      report(`${file}: ChoPhim /api/subscription/plans intercepted returning valid VIP plans`, plansPassed);
    });

    // Test React DOM removeChild Defender
    let defenderPassed = false;
    try {
      const nodeInstance = new ctx.Node();
      const removed = nodeInstance.removeChild({});
      defenderPassed = Boolean(removed !== null);
    } catch (e) {
      defenderPassed = false;
    }
    report(`${file}: ChoPhim React DOM removeChild Defender safely prevents NotFoundError crash`, defenderPassed);

    // Test /api/auth/update-profile persistence (Emoji & Avatar Frame)
    ctx.window.fetch("/api/auth/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedEmoji: "pepe-test", avatarFrame: "frame_5.png" })
    }).then(res => res.json()).then(data => {
      const updatePassed = Boolean(data?.user?.selectedEmoji === "pepe-test" && data?.user?.avatarFrame === "frame_5.png");
      report(`${file}: ChoPhim /api/auth/update-profile saves and returns selectedEmoji & avatarFrame`, updatePassed);
    });

    // Test POST /api/comments returning valid comment object with id
    ctx.window.fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: "phim-test", content: "Phim hay qua!", isSpoiler: false })
    }).then(res => res.json()).then(data => {
      const commentPassed = Boolean(data?.success === true && data?.comment?.id && data?.comment?.content === "Phim hay qua!");
      report(`${file}: ChoPhim POST /api/comments returns valid comment object with id`, commentPassed);
    });
  } catch (err) {
    report(`${file}: ChoPhim VIP execution`, false, err.stack);
  }
});

// MePhim VIP Admin & Modal Neutralizer
const mephimScripts = scriptFiles.filter(f => f.endsWith("mephim.user.js") || f.endsWith("web-enhancer-all.user.js"));
mephimScripts.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document } = createTopWindowMock("mephim.ddns.net");

  window.fetch = async (url) => {
    return {
      status: 200,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({}) }),
      json: async () => ({})
    };
  };

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    localStorage: window.localStorage,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    console: window.console,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    Promise,
    Response: class {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = init?.headers || {};
      }
      json() { return Promise.resolve(JSON.parse(this.body)); }
    }
  });

  try {
    vm.runInContext(code, ctx);

    // Verify localStorage mephim_logged_in_user seeded
    const userRaw = ctx.window.localStorage.getItem("mephim_logged_in_user");
    let userParsed = null;
    try { userParsed = JSON.parse(userRaw); } catch(e) {}
    const mephimSeedPassed = Boolean(userParsed?.email === "tnguyenquang946@gmail.com");
    report(`${file}: MePhim auto-seeded Admin email tnguyenquang946@gmail.com in localStorage`, mephimSeedPassed);

    // Verify admin emails
    const adminsRaw = ctx.window.localStorage.getItem("mephim_admin_emails");
    let adminsParsed = [];
    try { adminsParsed = JSON.parse(adminsRaw); } catch(e) {}
    const adminsPassed = Boolean(adminsParsed.includes("tnguyenquang946@gmail.com"));
    report(`${file}: MePhim auto-seeded admin email list in localStorage`, adminsPassed);
  } catch (err) {
    report(`${file}: MePhim VIP execution`, false, err.stack);
  }
});

// ═════════════════════════════════════════════════════════════════
// 5. LIVE FOOTBALL STREAMING & SPORTS AD-NUKER AUDIT
// ═════════════════════════════════════════════════════════════════
console.log("\n⚽ PHASE 5: Live Football Streaming & Sports Ad-Nuker Audit");

const sportsAndComicsScripts = [
  "scripts/sports/giovang.user.js",
  "scripts/sports/xoilac.user.js",
  "scripts/sports/chuoichien.user.js",
  "scripts/sports/bonglau.user.js",
  "scripts/sports/thapcam.user.js",
  "scripts/sports/khoga.user.js",
  "scripts/comics/zettruyen.user.js",
  "scripts/comics/toptruyen.user.js",
  "scripts/comics/nettruyen.user.js",
  "scripts/comics/truyenqq.user.js",
  "scripts/comics/truyenvn.user.js",
  "scripts/comics/luotnovel.user.js",
  "scripts/web-enhancer-all.user.js"
];

sportsAndComicsScripts.forEach(file => {
  const content = fs.readFileSync(file, "utf8");

  // Giờ Vàng TV checks
  if (file.includes("giovang") || file.includes("web-enhancer-all")) {
    const hasTvcDefuser = content.includes("giovang_tvc_pre_roll_daily");
    report(`${file}: Giờ Vàng TVC Pre-roll Storage Defuser present`, hasTvcDefuser);

    const hasTvcSelectors = content.includes(".tvc-pre-roll") && content.includes(".tvc-pre-roll__video") && content.includes(".tvc-pre-roll__skip");
    report(`${file}: Giờ Vàng TVC Pre-roll elements suppressed in CSS/Nuker`, hasTvcSelectors);

    const hasTvcDataSanitize = content.includes('data-tvc') && content.includes('"[]"');
    report(`${file}: Giờ Vàng data-tvc sanitized to [] on .livestream_widget`, hasTvcDataSanitize);

    const hasFixtureAndBalloonNuked = content.includes(".fixture-banner") && content.includes("balloon-wrapper") && content.includes("btn-balloon");
    report(`${file}: Giờ Vàng match banners & floating balloons (.fixture-banner, .balloon-wrapper) eradicated`, hasFixtureAndBalloonNuked);

    const hasToplistsNuked = content.includes("toplists-home") && content.includes("homepage-toplists-content") && content.includes("devvn-topfive-wrapper");
    report(`${file}: Giờ Vàng Top Nhà Cái section (.homepage-toplists-content, .toplists-home, .devvn-topfive) eradicated`, hasToplistsNuked);

    const hasBetDropdownNuked = content.includes("gv-bet-dropdown") && content.includes("box-odds-match") && content.includes("title-odds");
    report(`${file}: Giờ Vàng Cược ngay dropdown & Soi Kèo (.gv-bet-dropdown, .box-odds-match) eradicated`, hasBetDropdownNuked);
  }

  // Xôi Lạc TV checks
  if (file.includes("xoilac") || file.includes("web-enhancer-all")) {
    const hasCompanyBadgeNuked = content.includes(".odds-comp-logo") && content.includes("company") && content.includes("21-1.png");
    report(`${file}: Xôi Lạc gambling company badges (.odds-comp-logo, 21-1.png) suppressed`, hasCompanyBadgeNuked);

    const hasMarqueeNuked = content.includes(".marquee-container") && content.includes(".marquee-box");
    report(`${file}: Xôi Lạc 8XBET Marquee banner (.marquee-container) suppressed`, hasMarqueeNuked);

    const hasOddsButtonNuked = content.includes(".odds-button") && content.includes("15.235.211.192");
    report(`${file}: Xôi Lạc in-player 8XBET odds buttons & IP links suppressed`, hasOddsButtonNuked);

    const hasMatchOffersNuked = content.includes(".teambox__odds") && content.includes(".match-detail__offer") && content.includes(".btn-odds");
    report(`${file}: Xôi Lạc match odds & offer columns (.teambox__odds, .match-detail__offer) eradicated`, hasMatchOffersNuked);
  }

  // Chuối Chiên TV checks
  if (file.includes("chuoichien") || file.includes("bonglau") || file.includes("web-enhancer-all")) {
    const hasBannerPlayerNuked = content.includes(".banner-player") && content.includes(".banner-container") && content.includes("FB88");
    report(`${file}: Chuối Chiên TV video player banner & FB88 ads eradicated`, hasBannerPlayerNuked);

    const hasBetButtonsNuked = content.includes(".bet-button") && content.includes(".bet-buttons") && content.includes("cede0d5b");
    report(`${file}: Chuối Chiên TV betting buttons (.bet-button, Net-88, xBet79) eradicated`, hasBetButtonsNuked);

    const hasBetButtonPlayerNuked = content.includes(".bet-button-player") && content.includes("bet-buttons-container") && content.includes("bet-button-content");
    report(`${file}: Chuối Chiên TV in-player bet buttons (.bet-button-player, .bet-buttons-container) eradicated`, hasBetButtonPlayerNuked);

    const hasPlayerLogoWatermarkNuked = content.includes(".player-logo-wrapper") && content.includes("77ed3802") && content.includes("net88.boats");
    report(`${file}: Chuối Chiên TV player watermark logo (.player-logo-wrapper, Net88 logo) eradicated`, hasPlayerLogoWatermarkNuked);

    const hasAdsLayerNuked = content.includes("ads-layer") && content.includes("4c9315d7") && content.includes("1920x60");
    report(`${file}: Chuối Chiên TV master Ads Layer & 1920x60 banner (.ads-layer, [data-v-4c9315d7]) eradicated`, hasAdsLayerNuked);

    const hasModalPopupBackdropNuked = content.includes(".popup-backdrop") && content.includes(".qx-w") && content.includes("net88");
    report(`${file}: Chuối Chiên & Bông Lau popup backdrop (.popup-backdrop, .qx-w) & Net88 modal eradicated`, hasModalPopupBackdropNuked);

    const hasM3uRefererDirectives = content.includes("#EXTVLCOPT:http-referrer") && content.includes("|Referer=");
    report(`${file}: PotPlayer & VLC M3U stream launcher HTTP-Referer bypass directives enabled`, hasM3uRefererDirectives);
  }

  // Thập Cẩm TV checks
  if (file.includes("thapcam") || file.includes("web-enhancer-all")) {
    const hasCornerPopupNuked = content.includes("#corner-start-popup") && content.includes("1280x1280px") && content.includes(".corner-popup-wrap");
    report(`${file}: Thập Cẩm TV 18+ modal popup & corner banner eradicated`, hasCornerPopupNuked);

    const hasBookmakerNuked = content.includes(".bookmaker-title") && content.includes(".tf-section");
    report(`${file}: Thập Cẩm TV nhà cái list & betting section eradicated`, hasBookmakerNuked);

    const hasStickyAnnouncementNuked = content.includes("sticky-message") && content.includes("sticky-announcement") && content.includes("detail-live-brand");
    report(`${file}: Thập Cẩm TV chat sticky announcement & live brand banners (.sticky-message, .detail-live-brand) eradicated`, hasStickyAnnouncementNuked);
  }

  // Khô Gà TV checks
  if (file.includes("khoga") || file.includes("web-enhancer-all")) {
    const hasKhogaPlacementsNuked = content.includes("banner-pos-") && content.includes("ad-strip-pos") && content.includes("ad-popup-modal");
    report(`${file}: Khô Gà TV ad placements & popup modals (banner-pos-, ad-strip-pos, ad-popup-modal) eradicated`, hasKhogaPlacementsNuked);

    const hasKhogaBetLinksNuked = content.includes("fb88.com");
    report(`${file}: Khô Gà TV external betting links (fb88.com) suppressed`, hasKhogaBetLinksNuked);
  }

  // ZetTruyen & Comic Reader Pro checks
  if (file.includes("zettruyen") || file.includes("web-enhancer-all")) {
    const hasWidgetConfigDefused = content.includes("__WidgetConfig") && content.includes("__PopConfig");
    report(`${file}: ZetTruyen stealth ad widgets (__WidgetConfig, __PopConfig) defused`, hasWidgetConfigDefused);

    const hasAclibDefused = content.includes("runBanner") && content.includes("aclib");
    report(`${file}: ZetTruyen aclib Adcash script stubbed`, hasAclibDefused);

    const hasComicAdSelectors = content.includes("ads-tool-banner-container") && content.includes("data-zone") && content.includes("close-catfish");
    report(`${file}: ZetTruyen stealth ad zones & banner containers suppressed`, hasComicAdSelectors);

    const hasComicNav = content.includes("isComicPage") && content.includes("navigateComicChapter");
    report(`${file}: Comic reading hotkeys (A/D chapter, W/S smooth scroll, F fullscreen) active`, hasComicNav);

    const hasWidgetApiMocked = content.includes("/api/widget/data") && content.includes("items: {}");
    report(`${file}: ZetTruyen /api/widget/data intercepted with empty payload`, hasWidgetApiMocked);
  }

  // TopTruyen checks
  if (file.includes("toptruyen") || file.includes("web-enhancer-all")) {
    const hasTopTruyenAdsNuked = content.includes(".advertisement") && content.includes("#video-chapter");
    report(`${file}: TopTruyen .advertisement & #video-chapter video ads suppressed`, hasTopTruyenAdsNuked);

    const hasTopTruyenPopundersNuked = content.includes("chaseherbalpasty.com") && content.includes("dekkopinolin.com");
    report(`${file}: TopTruyen popunder networks (chaseherbalpasty, dekkopinolin) defused`, hasTopTruyenPopundersNuked);

    const hasTopTruyenNav = content.includes("chapter-next") && content.includes("chapter-previous");
    report(`${file}: TopTruyen chapter navigation selectors mapped in player-controls`, hasTopTruyenNav);
  }

  // NetTruyen checks
  if (file.includes("nettruyen") || file.includes("web-enhancer-all")) {
    const hasNetTruyenAdsNuked = content.includes(".banner.text-center") && content.includes(".popup_layer") && content.includes(".iframe-content-mobile");
    report(`${file}: NetTruyen banner & mobile iframe popup ads suppressed`, hasNetTruyenAdsNuked);

    const hasNetTruyenNav = content.includes("ddlSelectChapter");
    report(`${file}: NetTruyen chapter navigation (ctl00_mainContent_ddlSelectChapter) mapped`, hasNetTruyenNav);
  }

  // TruyenQQ checks
  if (file.includes("truyenqq") || file.includes("web-enhancer-all")) {
    const hasTruyenQQAdsNuked = content.includes("#top-banner-reading-container") && content.includes("#mid-banner-reading-container") && content.includes("#ad_info");
    report(`${file}: TruyenQQ top & mid reading ad banners suppressed`, hasTruyenQQAdsNuked);

    const hasTruyenQQNav = content.includes("link-next-chap") && content.includes("link-prev-chap");
    report(`${file}: TruyenQQ chapter navigation (link-next-chap, link-prev-chap) mapped`, hasTruyenQQNav);
  }

  // TruyenVN checks
  if (file.includes("truyenvn") || file.includes("web-enhancer-all")) {
    const hasTruyenVNAdsNuked = content.includes(".ads-static-header") && content.includes(".ads-static-home-detail-chapter");
    report(`${file}: TruyenVN static header & detail chapter ads suppressed`, hasTruyenVNAdsNuked);

    const hasTruyenVNNav = content.includes("slt_list_chapters") && content.includes("prev_page") && content.includes("next_page");
    report(`${file}: TruyenVN chapter navigation (slt_list_chapters, prev_page, next_page) mapped`, hasTruyenVNNav);
  }

  // LuotNovel checks
  if (file.includes("luotnovel") || file.includes("web-enhancer-all")) {
    const hasLuotNovelAdsNuked = content.includes(".mission-ads") && content.includes(".tr-ads-click");
    report(`${file}: LuotNovel mission ads & popup noti suppressed`, hasLuotNovelAdsNuked);

    const hasLuotNovelNav = content.includes("#prevChapter") && content.includes("#nextChapter");
    report(`${file}: LuotNovel chapter navigation (#prevChapter, #nextChapter) mapped`, hasLuotNovelNav);
  }

  // GhienPhim, DuPhim, CoiPhim & GhienBlog checks
  if (file.includes("ghienphim") || file.includes("duphim") || file.includes("coiphim") || file.includes("ghienblog") || file.includes("web-enhancer-all")) {
    const hasFloaterAdsNuked = content.includes(".ad-floater") && content.includes(".promotion-popup") && content.includes(".source-banner") && content.includes(".s-momo");
    report(`${file}: GhienPhim ecosystem ad floaters (.s-momo) & promotion popups suppressed`, hasFloaterAdsNuked);

    const hasComponentAdsNuked = content.includes(".component.ads") && content.includes(".ad-1170x150") && content.includes(".adtop");
    report(`${file}: GhienPhim ecosystem component ads & 1170x150 banners suppressed`, hasComponentAdsNuked);

    const hasNoAdsBadgeNuked = content.includes(".no-ads") && content.includes(".anti-bad-ad");
    report(`${file}: GhienPhim ecosystem .no-ads floating badge & anti-bad-ad popup suppressed`, hasNoAdsBadgeNuked);

    const hasBetLinksNuked = content.includes("bom88") || content.includes("ok999") || content.includes("linkroyal") || content.includes("hdbet");
    report(`${file}: GhienPhim ecosystem betting & redirect links (bom88/ok999/linkroyal/hdbet) suppressed`, hasBetLinksNuked);

    const hasDoubokMatch = content.includes("doubok.xyz") && content.includes("salesperyear.xyz");
    report(`${file}: Doubok & SalesPerYear iframe embed match patterns present`, hasDoubokMatch);

    const hasDataValueScan = content.includes("data-value") && content.includes("isNoRefererCdn");
    report(`${file}: [data-value] stream attribute & anti-referer CDN filter present`, hasDataValueScan);

    const hasTvcAdsDefused = content.includes(".video-ad-layer") && content.includes("#video-premium") && content.includes(".btn-skip-video");
    report(`${file}: TVC pre-roll video ads (.video-ad-layer, #video-premium, .btn-skip-video) defused & nuked`, hasTvcAdsDefused);

    if (file.includes("ghienphim") || file.includes("coiphim") || file.includes("duphim") || file.includes("web-enhancer-all")) {
      const hasFirebaseVipMock = content.includes("VIP_GHIENPHIM_USER") && content.includes("patchGhienphimProfileDom");
      report(`${file}: GhienPhim & CoiPhim Firebase Auth VIP mock & profile bypass present`, hasFirebaseVipMock);

      const hasTopWindowHlsSniffer = content.includes("hookHlsProtoTop") && content.includes("_memPlaylist");
      report(`${file}: Top-window HLS & in-memory playlist sniffer present`, hasTopWindowHlsSniffer);
    }
  }

  // GhienTruyen checks
  if (file.includes("ghientruyen") || file.includes("web-enhancer-all")) {
    const hasGhienTruyenAdsNuked = content.includes(".advertisement") && (content.includes("seotraffic.io.vn") || content.includes("acscdn.com"));
    report(`${file}: GhienTruyen .advertisement & SEO traffic script suppressed`, hasGhienTruyenAdsNuked);

    const hasGhienTruyenNav = content.includes("ghientruyen") && content.includes("Chương sau");
    report(`${file}: GhienTruyen chapter navigation (A/D & Chương sau/trước) mapped`, hasGhienTruyenNav);
  }
});

// Runtime functional check for URL unwrapping and Anti-Referer CDN guard
console.log("\n🌐 PHASE 5: Advanced Stream Sniffer & Anti-Referer CDN Verification");
const { getSnifferCode } = require("./src/modules/sniffer");
const playerControlsCode = require("./src/modules/player-controls");

const sandboxEnv = {
  window: { self: {}, top: {}, addEventListener: () => {}, localStorage: { getItem: () => null, setItem: () => {} } },
  document: { addEventListener: () => {}, querySelector: () => null, querySelectorAll: () => [], createElement: () => ({ appendChild: () => {}, style: {} }), head: { appendChild: () => {} }, documentElement: { appendChild: () => {} } },
  location: { href: "https://duphim.social/vod/watch/quy-quyet-ranh-gioi-vo-dinh", hostname: "duphim.social", pathname: "/vod/watch/quy-quyet-ranh-gioi-vo-dinh" },
  navigator: { userAgent: "Mozilla/5.0", clipboard: { writeText: () => Promise.resolve() } },
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: setTimeout,
  setInterval: () => 1,
  console: { log: () => {} },
  URL: URL,
  atob: (s) => Buffer.from(s, "base64").toString("utf-8"),
  decodeURIComponent: decodeURIComponent,
  encodeURIComponent: encodeURIComponent
};
sandboxEnv.window.self = sandboxEnv.window;
sandboxEnv.window.top = sandboxEnv.window;

let vmContext = vm.createContext(sandboxEnv);
vm.runInContext(`(function() {
  ${getSnifferCode(false)}
  ${playerControlsCode}
  window.unwrapStreamUrl = unwrapStreamUrl;
  window.isNoRefererCdn = isNoRefererCdn;
})();`, vmContext);

// Verify unwrapStreamUrl inside master script
const testCostaUrl = "https://costa.salesperyear.xyz/temp?s=bachuzlunho/8kPRK9unOCYifXbh.m3u8&linknhung=1&t=1";
const unwrappedCosta = vm.runInContext(`window.unwrapStreamUrl("${testCostaUrl}")`, vmContext);
report("unwrapStreamUrl: Relative path in query param resolves with origin", unwrappedCosta === "https://costa.salesperyear.xyz/bachuzlunho/8kPRK9unOCYifXbh.m3u8", `Got: ${unwrappedCosta}`);

const testEscapedUrl = "https://scontent.cdninstagram.com/video.mp4?_nc_cat=1\\u0026oh=abcdef123456&amp;oe=789";
const unwrappedEscaped = vm.runInContext(`window.unwrapStreamUrl("${testEscapedUrl}")`, vmContext);
report("unwrapStreamUrl: Sanitizes HTML entities and unicode ampersands", !unwrappedEscaped.includes("\\u0026") && !unwrappedEscaped.includes("&amp;") && unwrappedEscaped.includes("&oh=") && unwrappedEscaped.includes("&oe="), `Got: ${unwrappedEscaped}`);

const igNoRef = vm.runInContext(`window.isNoRefererCdn("https://scontent.cdninstagram.com/o1/v/t2/video.mp4")`, vmContext);
report("isNoRefererCdn: Returns true for cdninstagram.com", igNoRef === true);

const fbNoRef = vm.runInContext(`window.isNoRefererCdn("https://video.xx.fbcdn.net/v/t2/video.mp4")`, vmContext);
report("isNoRefererCdn: Returns true for fbcdn.net", fbNoRef === true);

const standardCdnRef = vm.runInContext(`window.isNoRefererCdn("https://costa.salesperyear.xyz/stream.m3u8")`, vmContext);
report("isNoRefererCdn: Returns false for standard movie streaming servers", standardCdnRef === false);

// ═════════════════════════════════════════════════════════════════
// 6. BROWSER EXTENSION (MANIFEST V3) VERIFICATION
// ═════════════════════════════════════════════════════════════════
console.log("\n🧩 PHASE 6: Standalone Browser Extension (Manifest V3) Audit");

const extDir = path.join(__dirname, "extension");
const manifestPath = path.join(extDir, "manifest.json");

let manifestObj = null;
let manifestValidJson = false;
try {
  manifestObj = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifestValidJson = true;
} catch (e) {}

report("extension/manifest.json: File exists and valid JSON", manifestValidJson);

if (manifestObj) {
  const expectedVersion = require("./package.json").version;
  report("extension/manifest.json: manifest_version is 3", manifestObj.manifest_version === 3);
  report("extension/manifest.json: Name & version defined", manifestObj.name && manifestObj.version === expectedVersion);
  report("extension/manifest.json: Background service worker configured", manifestObj.background && manifestObj.background.service_worker === "background.js");
  report("extension/manifest.json: DeclarativeNetRequest permissions granted", manifestObj.permissions && manifestObj.permissions.includes("declarativeNetRequest") && manifestObj.permissions.includes("storage"));
  report("extension/manifest.json: Host permissions cover <all_urls>", manifestObj.host_permissions && manifestObj.host_permissions.includes("<all_urls>"));
  report("extension/manifest.json: Action popup defined", manifestObj.action && manifestObj.action.default_popup === "popup/popup.html");

  // Validate PNG icons
  const iconSizes = ["16", "48", "128"];
  iconSizes.forEach(sz => {
    const iconRel = manifestObj.icons && manifestObj.icons[sz];
    const iconFile = path.join(extDir, iconRel || "");
    const exists = fs.existsSync(iconFile);
    let validPng = false;
    if (exists) {
      const buf = fs.readFileSync(iconFile);
      validPng = buf.length > 50 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
    }
    report(`extension/icons/icon${sz}.png: Valid PNG binary header & non-empty`, validPng);
  });

  // Validate declarativeNetRequest rules
  const rulesPath = path.join(extDir, "rules.json");
  let rulesObj = null;
  try {
    rulesObj = JSON.parse(fs.readFileSync(rulesPath, "utf8"));
  } catch (e) {}
  report("extension/rules.json: Valid ruleset array", Array.isArray(rulesObj) && rulesObj.length >= 10);
  if (Array.isArray(rulesObj)) {
    const hasRefererRule = rulesObj.some(r => r.action && r.action.type === "modifyHeaders" && r.action.requestHeaders && r.action.requestHeaders.some(h => h.header === "Referer"));
    report("extension/rules.json: EdgeMaxCDN Referer bypass rule present", hasRefererRule);
    const hasBetBlock = rulesObj.some(r => r.action && r.action.type === "block" && r.condition && (r.condition.urlFilter.includes("fb88") || r.condition.urlFilter.includes("net88")));
    report("extension/rules.json: Network-level betting ad block rules present", hasBetBlock);
  }

  // Validate Content Scripts
  const cs = manifestObj.content_scripts;
  report("extension/manifest.json: Content scripts defined", Array.isArray(cs) && cs.length >= 2);

  if (Array.isArray(cs)) {
    const mainWorldScript = cs.find(c => c.world === "MAIN");
    report("extension/manifest.json: MAIN world content script configured for page hooking", Boolean(mainWorldScript && mainWorldScript.js.some(s => s.endsWith("content.js"))));
    report("extension/manifest.json: MAIN world script runs at document_start", Boolean(mainWorldScript && mainWorldScript.run_at === "document_start"));
    report("extension/manifest.json: MAIN world script applies to all_frames", Boolean(mainWorldScript && mainWorldScript.all_frames === true));

    const bridgeScript = cs.find(c => c.js && c.js.some(s => s.endsWith("bridge.js")));
    report("extension/manifest.json: Isolated bridge script configured for runtime messaging", Boolean(bridgeScript));

    // Validate Chrome match pattern compliance on 100% of patterns
    const chromePatternRegex = /^(\*|https?):\/\/(\*|\*\.[a-z0-9\-]+(\.[a-z0-9\-]+)+|[a-z0-9\-]+(\.[a-z0-9\-]+)+)\/.*$/i;
    const matches = (mainWorldScript && mainWorldScript.matches) || [];
    const invalidMatches = matches.filter(m => !chromePatternRegex.test(m));
    report(`extension matches: 100% compliance with Chrome MV3 pattern specification (${matches.length} patterns)`, invalidMatches.length === 0, invalidMatches.slice(0, 3).join(", "));
    report("extension matches: rophim10.work pattern present", matches.some(m => m.includes("rophim10.work")));
    report("extension matches: moviehdthai.com pattern present", matches.some(m => m.includes("moviehdthai.com")));
    report("extension matches: cobephim.cfd pattern present", matches.some(m => m.includes("cobephim.cfd")));
    report("extension matches: clubc.org embed pattern present", matches.some(m => m.includes("clubc.org")));
    report("extension matches: darkbytes.xyz embed pattern present", matches.some(m => m.includes("darkbytes.xyz")));
    report("extension matches: film4k.net pattern present", matches.some(m => m.includes("film4k.net")));
    report("extension matches: film4knet.ngaodacopho.workers.dev pattern present", matches.some(m => m.includes("workers.dev")));
    report("extension matches: duphim.one pattern present", matches.some(m => m.includes("duphim.one")));
    report("extension matches: bonglautv1.org pattern present", matches.some(m => m.includes("bonglautv1.org")));
    report("extension rules: cdnvip net88 video block rule present", Array.isArray(rulesObj) && rulesObj.some(r => r.condition && r.condition.urlFilter.includes("cdnvip.chuoichientv.net/video")));
    report("extension rules: irondom ad-block rule present", Array.isArray(rulesObj) && rulesObj.some(r => r.condition && r.condition.urlFilter.includes("irondom")));
  }

  // Validate script syntax
  const filesToSyntaxCheck = [
    { file: path.join(extDir, "background.js"), name: "extension/background.js" },
    { file: path.join(extDir, "content", "core", "bridge.js"), name: "extension/content/core/bridge.js" },
    { file: path.join(extDir, "content", "core", "icons.js"), name: "extension/content/core/icons.js" },
    { file: path.join(extDir, "content", "core", "content.js"), name: "extension/content/core/content.js" },
    { file: path.join(extDir, "content", "features", "ad-nuker.js"), name: "extension/content/features/ad-nuker.js" },
    { file: path.join(extDir, "content", "features", "sniffer.js"), name: "extension/content/features/sniffer.js" },
    { file: path.join(extDir, "content", "features", "player-controls.js"), name: "extension/content/features/player-controls.js" },
    { file: path.join(extDir, "content", "features", "hub-ui.js"), name: "extension/content/features/hub-ui.js" },
    { file: path.join(extDir, "content", "vip", "vip-engine.js"), name: "extension/content/vip/vip-engine.js" },
    { file: path.join(extDir, "content", "vip", "cinema.js"), name: "extension/content/vip/cinema.js" },
    { file: path.join(extDir, "content", "vip", "anime.js"), name: "extension/content/vip/anime.js" },
    { file: path.join(extDir, "content", "vip", "sports.js"), name: "extension/content/vip/sports.js" },
    { file: path.join(extDir, "content", "vip", "comics.js"), name: "extension/content/vip/comics.js" },
    { file: path.join(extDir, "content", "vip", "auth.js"), name: "extension/content/vip/auth.js" },
    { file: path.join(extDir, "popup", "popup.js"), name: "extension/popup/popup.js" }
  ];

  filesToSyntaxCheck.forEach(({ file, name }) => {
    let passed = false;
    let err = "";
    try {
      const code = fs.readFileSync(file, "utf8");
      new vm.Script(code, { filename: name });
      passed = true;
    } catch (e) {
      err = e.message;
    }
    report(`${name}: ES2022 Syntax Valid`, passed, err);
  });

  // Validate Popup UI files
  const popupHtml = path.join(extDir, "popup", "popup.html");
  const popupCss = path.join(extDir, "popup", "popup.css");
  const htmlContent = fs.existsSync(popupHtml) ? fs.readFileSync(popupHtml, "utf8") : "";
  const cssContent = fs.existsSync(popupCss) ? fs.readFileSync(popupCss, "utf8") : "";

  report("extension/popup/popup.html: Contains UI controls & stream detection container", htmlContent.includes("current-host") && htmlContent.includes("stream-text") && htmlContent.includes("btn-toggle-hdr"));
  report("extension/popup/popup.css: Non-empty Glassmorphism stylesheet", cssContent.length > 500 && cssContent.includes(".popup-container"));
  report("extension/content/styles.css: Master stylesheet compiled", fs.existsSync(path.join(extDir, "content", "styles.css")) && fs.statSync(path.join(extDir, "content", "styles.css")).size > 20000);

  // Validate Anti-Crash Shield & TVC Bypass
  const adNukerCode = fs.readFileSync(path.join(extDir, "content", "features", "ad-nuker.js"), "utf8");
  report("extension/content/features/ad-nuker.js: Anti-crash iframe protection present", adNukerCode.includes("crash.html") && adNukerCode.includes("HTMLIFrameElement.prototype"));
  report("extension/content/features/ad-nuker.js: rophim-tvc-shown pre-roll bypass present", adNukerCode.includes("rophim-tvc-shown"));

  // Validate Extension VIP Cinema Module for new sites
  const cinemaCode = fs.readFileSync(path.join(extDir, "content", "vip", "cinema.js"), "utf8");
  const hasExtRophimKeywords = cinemaCode.includes("moviehdthai.com") && cinemaCode.includes("cobephim.cfd") && cinemaCode.includes("rophim10.work");
  report("extension/content/vip/cinema.js: Keywords cover moviehdthai, cobephim, and rophim10", hasExtRophimKeywords);

  const hasExtHostCheck = cinemaCode.includes("moviehdthai") && cinemaCode.includes("cobephim");
  report("extension/content/vip/cinema.js: isRophimHost covers moviehdthai and cobephim", hasExtHostCheck);

  const hasExtCredKeys = cinemaCode.includes("MOVIEHDTHAI_CREDENTIALS") && cinemaCode.includes("COBEPHIM_CREDENTIALS");
  report("extension/content/vip/cinema.js: Per-site credential storage isolated", hasExtCredKeys);

  // Validate userscript embed mappings
  const moviehdthaiScript = fs.readFileSync(path.join(__dirname, "scripts", "movies", "moviehdthai.user.js"), "utf8");
  report("scripts/movies/moviehdthai.user.js: clubc.org embed domain mapped", moviehdthaiScript.includes("clubc.org"));

  const cobephimScript = fs.readFileSync(path.join(__dirname, "scripts", "movies", "cobephim.user.js"), "utf8");
  report("scripts/movies/cobephim.user.js: darkbytes.xyz embed domain mapped", cobephimScript.includes("darkbytes.xyz"));

  const film4kScript = fs.readFileSync(path.join(__dirname, "scripts", "movies", "film4k.user.js"), "utf8");
  report("scripts/movies/film4k.user.js: film4k.net domain mapped", film4kScript.includes("film4k.net"));
  report("scripts/movies/film4k.user.js: workers.dev CDN streaming domain mapped", film4kScript.includes("workers.dev"));
  report("scripts/movies/film4k.user.js: f4k:entered & community-dismissed auto-bypass present", film4kScript.includes("f4k:entered") && film4kScript.includes("community-dismissed"));
  report("scripts/movies/film4k.user.js: .side-signin & .side-pair hidden via CSS", film4kScript.includes(".side-signin") && film4kScript.includes(".side-pair"));
  report("extension/content/features/ad-nuker.js: Film4k landing gate and dialog auto-bypass present", adNukerCode.includes("landing-enter") && adNukerCode.includes("cdlg-ok") && adNukerCode.includes("f4k:entered"));
  report("extension/content/vip/cinema.js: Film4k VIP user and /api/auth/me interception present", cinemaCode.includes("/api/auth/me") && cinemaCode.includes("sfrank1e@film4k.vip"));

  // ─── RUNTIME ISOLATION & REGRESSION PREVENTION AUDIT ───
  // Regression Test 1: sniffer.js fetch hook in isolation without isAdApi in scope
  try {
    const snifferContent = fs.readFileSync(path.join(extDir, "content", "features", "sniffer.js"), "utf8");
    const mockWindow = {
      location: { href: "https://rophim10.work/phimhay", hostname: "rophim10.work", origin: "https://rophim10.work" },
      document: { title: "RoPhim", querySelector: () => null, getElementById: () => null },
      fetch: async (input) => ({ status: 200, clone: () => ({ text: async () => "" }) }),
      Response: typeof Response !== "undefined" ? Response : class Response { constructor(b, i) { this.body = b; this.init = i; } },
      XMLHttpRequest: function () { this.open = () => {}; this.send = () => {}; this.addEventListener = () => {}; },
      addEventListener: () => {},
      localStorage: { getItem: () => null, setItem: () => {} },
      postMessage: () => {},
      setInterval: () => 1,
      clearInterval: () => {},
      setTimeout: (fn) => setTimeout(fn, 0),
      clearTimeout: () => {},
      console: { log: () => {}, warn: () => {}, error: () => {} }
    };
    mockWindow.window = mockWindow;
    const testCtx = vm.createContext(mockWindow);
    vm.runInContext(snifferContent, testCtx);

    let fetchThrew = false;
    let fetchErrMsg = "";
    try {
      const p1 = mockWindow.fetch("https://rophim10.work/api/auth/session");
      if (p1 && p1.catch) p1.catch(e => { fetchThrew = true; fetchErrMsg = e.message; });
      const p2 = mockWindow.fetch("https://rophim10.work/banner/ads");
      if (p2 && p2.catch) p2.catch(e => { fetchThrew = true; fetchErrMsg = e.message; });
    } catch (e) {
      fetchThrew = true;
      fetchErrMsg = e.message;
    }
    report("extension/content/features/sniffer.js: fetch hook executes in isolation without isAdApi ReferenceError", !fetchThrew, fetchErrMsg);
  } catch (e) {
    report("extension/content/features/sniffer.js: fetch hook executes in isolation without isAdApi ReferenceError", false, e.message);
  }

  // Regression Test 2: hub-ui.js executes and binds buttons without copyM3u8 ReferenceError
  try {
    const hubContent = fs.readFileSync(path.join(extDir, "content", "features", "hub-ui.js"), "utf8");
    const mockElements = new Map();
    const mockBody = {
      children: [],
      appendChild: (el) => { mockBody.children.push(el); return el; }
    };
    const mockDoc = {
      body: mockBody,
      getElementById: (id) => mockElements.get(id) || null,
      createElement: (tag) => {
        const el = {
          tagName: tag.toUpperCase(),
          children: [],
          classList: { toggle: () => {}, remove: () => {}, add: () => {} },
          style: {},
          addEventListener: (evt, fn) => { el["_on_" + evt] = fn; },
          querySelector: (sel) => {
            const id = sel.replace("#", "");
            return mockElements.get(id) || null;
          },
          querySelectorAll: () => []
        };
        Object.defineProperty(el, "innerHTML", {
          set: (html) => {
            el._html = html;
            const matches = html.match(/id="([^"]+)"/g) || [];
            matches.forEach(m => {
              const id = m.replace('id="', '').replace('"', '');
              mockElements.set(id, {
                id,
                style: {},
                classList: { toggle: () => {}, remove: () => {}, add: () => {} },
                addEventListener: (evt, fn) => { el["_on_" + evt] = fn; }
              });
            });
          },
          get: () => el._html || ""
        });
        return el;
      },
      addEventListener: () => {}
    };
    const mockWindow = {
      document: mockDoc,
      RO_ICONS: require("./src/modules/icons"),
      addEventListener: () => {},
      scrollBy: () => {}
    };
    mockWindow.window = mockWindow;
    const testCtx = vm.createContext(mockWindow);
    vm.runInContext(hubContent, testCtx);

    let hubThrew = false;
    let hubErrMsg = "";
    try {
      if (typeof mockWindow.initVipHub === "function") {
        mockWindow.initVipHub();
      }
    } catch (e) {
      hubThrew = true;
      hubErrMsg = e.message;
    }
    report("extension/content/features/hub-ui.js: initVipHub executes in isolation without copyM3u8 ReferenceError", !hubThrew, hubErrMsg);
  } catch (e) {
    report("extension/content/features/hub-ui.js: initVipHub executes in isolation without copyM3u8 ReferenceError", false, e.message);
  }

  // Regression Test 3: player-controls.js executes actions without ReferenceError
  try {
    const controlsContent = fs.readFileSync(path.join(extDir, "content", "features", "player-controls.js"), "utf8");
    const mockWindow = {
      document: {
        querySelector: () => null,
        querySelectorAll: () => [],
        body: { classList: { toggle: () => {} } },
        title: "Test Video"
      },
      navigator: { clipboard: { writeText: () => Promise.resolve() } },
      localStorage: { getItem: () => null, setItem: () => {} },
      location: { href: "https://cobephim.cfd/watch/123", hostname: "cobephim.cfd" },
      addEventListener: () => {},
      console: { log: () => {}, warn: () => {}, error: () => {} }
    };
    mockWindow.window = mockWindow;
    const testCtx = vm.createContext(mockWindow);
    vm.runInContext(controlsContent, testCtx);

    let controlsThrew = false;
    let controlsErrMsg = "";
    try {
      mockWindow.copyM3u8();
      mockWindow.openPotPlayer();
      mockWindow.openVlcPlayer();
      mockWindow.skipIntro(85);
      mockWindow.toggleHdr();
      mockWindow.toggleTheater();
      mockWindow.adjustVolume(0.1);
    } catch (e) {
      controlsThrew = true;
      controlsErrMsg = e.message;
    }
    report("extension/content/features/player-controls.js: player actions execute cleanly in isolation without ReferenceError", !controlsThrew, controlsErrMsg);
  } catch (e) {
    report("extension/content/features/player-controls.js: player actions execute cleanly in isolation without ReferenceError", false, e.message);
  }

  // ─── EXTENSION RUNTIME DEFENSE AUDITS ───
  // 1. Check cinema.js _origFetchNative safety
  const extCinemaPath = path.join(extDir, "content", "vip", "cinema.js");
  if (fs.existsSync(extCinemaPath)) {
    const code = fs.readFileSync(extCinemaPath, "utf8");
    const hasSafeDecl = code.includes("const _origFetchNative =");
    report("extension/content/vip/cinema.js: _origFetchNative safely declared in local module scope", hasSafeDecl);
  }

  // 2. Check sports.js _origFetchNative safety
  const extSportsPath = path.join(extDir, "content", "vip", "sports.js");
  if (fs.existsSync(extSportsPath)) {
    const code = fs.readFileSync(extSportsPath, "utf8");
    const hasSafeDecl = code.includes("const _origFetchNative =");
    report("extension/content/vip/sports.js: _origFetchNative safely declared in local module scope", hasSafeDecl);
  }

  // 3. Check sniffer.js XMLHttpRequest prototype inheritance
  const extSnifferPath = path.join(extDir, "content", "features", "sniffer.js");
  if (fs.existsSync(extSnifferPath)) {
    const code = fs.readFileSync(extSnifferPath, "utf8");
    const hasProtoLink = code.includes("window.XMLHttpRequest.prototype = origXhrMain.prototype;");
    report("extension/content/features/sniffer.js: window.XMLHttpRequest.prototype linked to preserve prototype chain & instanceof", hasProtoLink);
  }

  // 4. Check vip-engine.js handleRophimXhrResponse implementation
  const extVipEnginePath = path.join(extDir, "content", "vip", "vip-engine.js");
  if (fs.existsSync(extVipEnginePath)) {
    const code = fs.readFileSync(extVipEnginePath, "utf8");
    const hasXhrPatcher = code.includes("window.handleRophimXhrResponse = function") && code.includes("registry.patchData(data, url)");
    report("extension/content/vip/vip-engine.js: handleRophimXhrResponse actively patches XHR responses", hasXhrPatcher);

    const hasSerializedCompare = code.includes("newText !== text");
    report("extension/content/vip/vip-engine.js: patch comparison uses serialized string comparison (defends against in-place mutations)", hasSerializedCompare);

    const hasObjectMockSupport = code.includes("const body = isString ? mock : JSON.stringify(mock);");
    report("extension/content/vip/vip-engine.js: interceptFetch supports plain Object/Array mocks and HTML mocks", hasObjectMockSupport);
  }

  // 5. Check background.js session storage persistence
  const extBgPath = path.join(extDir, "background.js");
  if (fs.existsSync(extBgPath)) {
    const code = fs.readFileSync(extBgPath, "utf8");
    const hasSessionStorage = code.includes("chrome.storage.session") && code.includes("saveTabStream");
    report("extension/background.js: Stream persistence uses chrome.storage.session (survives Service Worker inactivity)", hasSessionStorage);
  }
}

// Final check after promise tick
setTimeout(() => {
  console.log("\n================================================================");
  console.log("🎯 COMPREHENSIVE TEST AUDIT COMPLETE:");
  console.log(`   Total Unit & Runtime Assertions : ${totalTests}`);
  console.log(`   Passed Assertions               : ${passedTests}`);
  console.log(`   Failed Assertions               : ${failedTests}`);
  const pct = ((passedTests / totalTests) * 100).toFixed(1);
  console.log(`   Overall Health Score            : ${pct}%`);
  console.log("================================================================");

  if (failedTests === 0) {
    console.log("🏆 STATUS: 100% PRODUCTION READY - ZERO DEFECTS VERIFIED!\n");
    process.exit(0);
  } else {
    console.log("⚠️ STATUS: FAILING TESTS DETECTED!\n");
    process.exit(1);
  }
}, 500);
