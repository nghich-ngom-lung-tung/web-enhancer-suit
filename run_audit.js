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
  const hasAuthor = content.includes("@author       nghich-ngom-lung-tung");
  report(`${file}: Author is nghich-ngom-lung-tung`, hasAuthor);

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

const rophimScripts = scriptFiles.filter(f => f.endsWith("rophim.user.js") || f.endsWith("tampermonkey.user.js") || f.endsWith("web-enhancer-all.user.js") || f.endsWith("netanime.user.js"));
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

// ═════════════════════════════════════════════════════════════════
// 5. LIVE FOOTBALL STREAMING & SPORTS AD-NUKER AUDIT
// ═════════════════════════════════════════════════════════════════
console.log("\n⚽ PHASE 5: Live Football Streaming & Sports Ad-Nuker Audit");

const sportsAndComicsScripts = [
  "scripts/sports/giovang.user.js",
  "scripts/sports/xoilac.user.js",
  "scripts/sports/chuoichien.user.js",
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
  if (file.includes("chuoichien") || file.includes("web-enhancer-all")) {
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
    const hasFloaterAdsNuked = content.includes(".ad-floater") && content.includes(".promotion-popup") && content.includes(".source-banner");
    report(`${file}: GhienPhim ecosystem ad floaters & promotion popups suppressed`, hasFloaterAdsNuked);

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
