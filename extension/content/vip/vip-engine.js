/**
 * Cinema Pro Suite - VIP Core Engine (Unified Network Interceptor)
 * Modular Architecture v1.0.0
 */
(() => {
  "use strict";

  // 1. React DOM mutation guard (absorb NotFoundError on hydration / unmount)
  try {
    if (typeof Node !== "undefined" && Node.prototype && !Node.prototype._cpro_guarded) {
      Node.prototype._cpro_guarded = true;
      const origRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        try {
          return origRemoveChild.call(this, child);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            try {
              if (child && child.parentNode && typeof child.parentNode.removeChild === "function") {
                return child.parentNode.removeChild(child);
              }
            } catch (e) {}
            return child;
          }
          throw err;
        }
      };

      const origInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, refNode) {
        try {
          return origInsertBefore.call(this, newNode, refNode);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            return this.appendChild(newNode);
          }
          throw err;
        }
      };
    }
  } catch (e) {}

  // 2. Global VIP Constants
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;

  // 3. Global VIP Registry
  const registry = {
    VIP_EXPIRY_DATE,
    VIP_EXPIRY_TIMESTAMP,
    COIN_BALANCE,
    mockHandlers: [],
    responsePatchers: [],
    registerMock(fn) {
      if (typeof fn === "function") this.mockHandlers.push(fn);
    },
    registerPatcher(fn) {
      if (typeof fn === "function") this.responsePatchers.push(fn);
    },
    getMockResponse(url, init) {
      if (!url || typeof url !== "string") return null;
      if (init && init.headers) {
        const h = init.headers;
        const isInternal = (typeof h.get === "function" ? (h.get("X-Cinema-Pro-Internal") || h.get("x-cinema-pro-internal")) : (h["X-Cinema-Pro-Internal"] || h["x-cinema-pro-internal"]));
        if (isInternal) return null;
      }
      for (const h of this.mockHandlers) {
        try {
          const res = h(url, init);
          if (res !== null && res !== undefined) return res;
        } catch (e) {}
      }
      return null;
    },
    patchData(data, url) {
      if (!data || typeof data !== "object") return data;
      let cur = data;
      for (const p of this.responsePatchers) {
        try {
          cur = p(cur, url);
        } catch (e) {}
      }
      return cur;
    }
  };

  window.VIP_REGISTRY = registry;

  // 4. Fetch & XHR Proxy Interception
  function interceptFetch(url, init) {
    const mock = registry.getMockResponse(url, init);
    if (mock !== null) {
      if (typeof mock === "string") {
        return new Response(mock, {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
      if (mock instanceof Response) return mock;
    }
    return null;
  }

  // Hook window.fetch
  if (typeof window !== "undefined" && window.fetch && !window.fetch._cpro_vip_hooked) {
    const rawFetch = window.fetch;
    const fetchProxy = function (input, init) {
      let url = "";
      if (typeof input === "string") url = input;
      else if (input && typeof input.url === "string") url = input.url;

      const mockRes = interceptFetch(url, init);
      if (mockRes) return Promise.resolve(mockRes);

      return rawFetch.apply(this, arguments).then(async (response) => {
        try {
          const ctype = response.headers ? response.headers.get("content-type") : "";
          if (ctype && ctype.includes("application/json")) {
            const clone = response.clone();
            const text = await clone.text();
            if (text && text.trim().length > 0) {
              const data = JSON.parse(text);
              if (typeof window.extractStreamFromObject === "function") window.extractStreamFromObject(data);
              const patched = registry.patchData(data, url);
              if (patched !== data) {
                return new Response(JSON.stringify(patched), {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers
                });
              }
            }
          }
        } catch (e) {}
        return response;
      });
    };
    fetchProxy._cpro_vip_hooked = true;
    window.fetch = fetchProxy;
  }

  // Hook XMLHttpRequest
  if (typeof window !== "undefined" && window.XMLHttpRequest && !window.XMLHttpRequest.prototype._cpro_vip_hooked) {
    const origOpen = window.XMLHttpRequest.prototype.open;
    const origSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function (method, url) {
      this._cpro_url = url;
      this._cpro_method = method;
      return origOpen.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function (body) {
      const url = this._cpro_url;
      const mockStr = registry.getMockResponse(url, { method: this._cpro_method, body });
      if (mockStr !== null) {
        let textPayload = typeof mockStr === "string" ? mockStr : "";
        let parsedObj = null;
        if (typeof mockStr === "string") {
          try { parsedObj = JSON.parse(mockStr); } catch (e) {}
        } else {
          parsedObj = mockStr;
          try { textPayload = JSON.stringify(mockStr); } catch (e) {}
        }
        Object.defineProperty(this, "readyState", { writable: true, value: 4 });
        Object.defineProperty(this, "status", { writable: true, value: 200 });
        Object.defineProperty(this, "statusText", { writable: true, value: "OK" });
        Object.defineProperty(this, "responseText", { writable: true, value: textPayload });
        Object.defineProperty(this, "response", {
          get: function () {
            if (this.responseType === "json") return parsedObj;
            if (this.responseType === "text") return textPayload;
            return parsedObj !== null ? parsedObj : textPayload;
          },
          configurable: true
        });
        this.getAllResponseHeaders = function () {
          return "content-type: application/json; charset=utf-8";
        };
        this.getResponseHeader = function (h) {
          if (h && h.toLowerCase() === "content-type") return "application/json; charset=utf-8";
          return null;
        };
        setTimeout(() => {
          if (typeof this.onreadystatechange === "function") this.onreadystatechange();
          if (typeof this.onload === "function") this.onload();
        }, 1);
        return;
      }

      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          try {
            const text = this.responseText;
            if (text && (text.startsWith("{") || text.startsWith("["))) {
              const data = JSON.parse(text);
              if (typeof window.extractStreamFromObject === "function") window.extractStreamFromObject(data);
              const patched = registry.patchData(data, this._cpro_url);
              if (patched !== data) {
                const newText = JSON.stringify(patched);
                Object.defineProperty(this, "responseText", { writable: true, value: newText });
                Object.defineProperty(this, "response", {
                  get: function () {
                    if (this.responseType === "json") return patched;
                    if (this.responseType === "text") return newText;
                    return patched || newText;
                  },
                  configurable: true
                });
              }
            }
          } catch (e) {}
        }
      });

      return origSend.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype._cpro_vip_hooked = true;
  }

  // Backward compatibility exports on window
  window.getRophimMockResponse = (url, init) => {
    const mock = registry.getMockResponse(url, init);
    if (!mock) return null;
    if (typeof mock === "string") {
      return new Response(mock, {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
    if (mock instanceof Response) return mock;
    return new Response(JSON.stringify(mock), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  };
  window.getRophimMockXhr = (url, body) => {
    const mock = registry.getMockResponse(url, { body });
    if (!mock) return null;
    return typeof mock === "string" ? mock : JSON.stringify(mock);
  };
  window.handleRophimFetchResponse = async (resPromise, url, init) => {
    const mock = window.getRophimMockResponse(url, init);
    if (mock) return mock;
    return await resPromise;
  };
  window.handleRophimXhrResponse = () => {};
})();
