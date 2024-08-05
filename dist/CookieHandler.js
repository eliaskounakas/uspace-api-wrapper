"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CookieHandler_instances, _CookieHandler_cookies, _CookieHandler_filterRawCookies;
Object.defineProperty(exports, "__esModule", { value: true });
class CookieHandler {
    constructor(cookies) {
        _CookieHandler_instances.add(this);
        _CookieHandler_cookies.set(this, void 0);
        __classPrivateFieldSet(this, _CookieHandler_cookies, __classPrivateFieldGet(this, _CookieHandler_instances, "m", _CookieHandler_filterRawCookies).call(this, cookies), "f");
    }
    get getCookies() {
        return __classPrivateFieldGet(this, _CookieHandler_cookies, "f");
    }
    set setCookies(cookies) {
        __classPrivateFieldSet(this, _CookieHandler_cookies, __classPrivateFieldGet(this, _CookieHandler_instances, "m", _CookieHandler_filterRawCookies).call(this, cookies), "f");
    }
    mergeCookies(incomingRawCookies) {
        const incomingCookies = __classPrivateFieldGet(this, _CookieHandler_instances, "m", _CookieHandler_filterRawCookies).call(this, incomingRawCookies);
        const cookiesMap = new Map();
        let mergedCookies = "";
        const currentCookiesArray = __classPrivateFieldGet(this, _CookieHandler_cookies, "f").split(";");
        const incomingCookiesArray = incomingCookies.split(";");
        for (const cookie of currentCookiesArray) {
            const key = cookie.split("=")[0];
            const value = cookie.split("=")[1];
            cookiesMap.set(key, value);
        }
        for (const cookie of incomingCookiesArray) {
            const key = cookie.split("=")[0];
            const value = cookie.split("=")[1];
            cookiesMap.set(key, value);
        }
        cookiesMap.forEach((value, key) => {
            mergedCookies += `${key}=${value};`;
        });
        __classPrivateFieldSet(this, _CookieHandler_cookies, mergedCookies, "f");
    }
}
_CookieHandler_cookies = new WeakMap(), _CookieHandler_instances = new WeakSet(), _CookieHandler_filterRawCookies = function _CookieHandler_filterRawCookies(rawCookies) {
    let cookies = rawCookies.split(",");
    cookies = cookies.map((cookie) => cookie.split(";")[0]);
    cookies = cookies.filter((cookie) => cookie.includes("="));
    cookies = cookies.map((cookie) => cookie.trim());
    return cookies.join("; ");
};
exports.default = CookieHandler;
