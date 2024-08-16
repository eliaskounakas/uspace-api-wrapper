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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _UspaceClient_session;
Object.defineProperty(exports, "__esModule", { value: true });
const CookieHandler_1 = __importDefault(require("./CookieHandler"));
const UspaceRequest_1 = __importDefault(require("./UspaceRequest"));
class UspaceClient {
    constructor(session = "") {
        _UspaceClient_session.set(this, void 0);
        __classPrivateFieldSet(this, _UspaceClient_session, session, "f");
    }
    get getSession() {
        return __classPrivateFieldGet(this, _UspaceClient_session, "f");
    }
    set setSession(session) {
        __classPrivateFieldSet(this, _UspaceClient_session, session, "f");
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionResponse = yield fetch(UspaceRequest_1.default.sessionURL);
            if (!sessionResponse.ok) {
                return new Response('Could not reach u:space server!', { status: 503 });
            }
            const sessionCookies = String(sessionResponse.headers.get("set-cookie"));
            const cookieHandler = new CookieHandler_1.default(sessionCookies);
            const loginRequest = new UspaceRequest_1.default(UspaceRequest_1.default.loginURL, "POST", cookieHandler.getCookies, { user: username, password: password });
            const loginResponse = yield loginRequest.send();
            const isLoginSuccessful = (yield loginResponse.json())['errors'] === null;
            if (!isLoginSuccessful) {
                return new Response('Invalid credentials', { status: 401 });
            }
            const loginCookies = String(loginResponse.headers.get("set-cookie"));
            cookieHandler.mergeCookies(loginCookies);
            __classPrivateFieldSet(this, _UspaceClient_session, cookieHandler.getCookies, "f");
            return new Response('Successfully logged in!', { status: 200 });
        });
    }
    getCourses(year, isWinterSemester) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _UspaceClient_session, "f") === "") {
                throw new Error("Invalid session, try logging in.");
            }
            const coursesBody = {
                request: {
                    method: "POST",
                    targetService: "as-studierende-anmeldeuebersicht",
                    path: "/v2/anmeldung/semesters/anmeldungen",
                    body: `["${year}${isWinterSemester ? "W" : "S"}"]`,
                },
            };
            const coursesRequest = new UspaceRequest_1.default(UspaceRequest_1.default.coursesURL, "POST", this.getSession, coursesBody);
            const coursesResponse = yield coursesRequest.send();
            if (!coursesResponse.ok) {
                return new Response('Could not fetch courses, session may have expired.', { status: 403 });
            }
            const courses = yield coursesResponse.json();
            return new Response(JSON.stringify(courses), { status: 200 });
        });
    }
}
_UspaceClient_session = new WeakMap();
exports.default = UspaceClient;
//# sourceMappingURL=UspaceClient.js.map