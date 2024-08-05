"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UspaceRequest_url, _UspaceRequest_method, _UspaceRequest_cookies, _UspaceRequest_body;
Object.defineProperty(exports, "__esModule", { value: true });
class UspaceRequest {
    constructor(url, method, cookies, body) {
        _UspaceRequest_url.set(this, void 0);
        _UspaceRequest_method.set(this, void 0);
        _UspaceRequest_cookies.set(this, void 0);
        _UspaceRequest_body.set(this, void 0);
        __classPrivateFieldSet(this, _UspaceRequest_url, url, "f");
        __classPrivateFieldSet(this, _UspaceRequest_method, method, "f");
        __classPrivateFieldSet(this, _UspaceRequest_cookies, cookies, "f");
        __classPrivateFieldSet(this, _UspaceRequest_body, body, "f");
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(__classPrivateFieldGet(this, _UspaceRequest_url, "f"), {
                body: JSON.stringify(__classPrivateFieldGet(this, _UspaceRequest_body, "f")),
                method: __classPrivateFieldGet(this, _UspaceRequest_method, "f"),
                headers: {
                    Cookie: __classPrivateFieldGet(this, _UspaceRequest_cookies, "f"),
                },
            });
        });
    }
}
_UspaceRequest_url = new WeakMap(), _UspaceRequest_method = new WeakMap(), _UspaceRequest_cookies = new WeakMap(), _UspaceRequest_body = new WeakMap();
UspaceRequest.sessionURL = "https://uspace.univie.ac.at/web/gast";
UspaceRequest.loginURL = "https://uspace.univie.ac.at/web/gast/login?p_p_id=ssploginportlet_WAR_ssploginportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=login&p_p_cacheability=cacheLevelPage";
UspaceRequest.coursesURL = "https://uspace.univie.ac.at/web/studium/anmeldeuebersicht?p_p_id=asstudierendeanmeldeuebersichtportlet_WAR_asstudierendeanmeldeuebersichtportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=_generic_request_&p_p_cacheability=cacheLevelPage";
exports.default = UspaceRequest;
