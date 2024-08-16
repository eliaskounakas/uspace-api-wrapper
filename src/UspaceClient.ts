import CookieHandler from "./CookieHandler";
import UspaceRequest from "./UspaceRequest";
import type { CourseData } from "./entities";

export default class UspaceClient {
  #session: string;

  constructor(session: string = "") {
    this.#session = session;
  }

  get getSession(): string {
    return this.#session;
  }

  set setSession(session: string) {
    this.#session = session;
  }

  async login(username: string, password: string): Promise<Response> {
    const sessionResponse: Response = await fetch(UspaceRequest.sessionURL);
    if (!sessionResponse.ok) {
      return new Response('Could not reach u:space server!', { status: 503 });
    }
    const sessionCookies: string = String(
      sessionResponse.headers.get("set-cookie"),
    );
    const cookieHandler: CookieHandler = new CookieHandler(sessionCookies);

    const loginRequest: UspaceRequest = new UspaceRequest(
      UspaceRequest.loginURL,
      "POST",
      cookieHandler.getCookies,
      { user: username, password: password },
    );
    const loginResponse: Response = await loginRequest.send();
    const isLoginSuccessful: boolean = (await loginResponse.json())['errors'] === null;

    if (!isLoginSuccessful) {
      return new Response('Invalid credentials', { status: 401 });
    }
    const loginCookies: string = String(loginResponse.headers.get("set-cookie"));
    cookieHandler.mergeCookies(loginCookies);

    this.#session = cookieHandler.getCookies;

    return new Response('Successfully logged in!', { status: 200 });
  }

  async getCourses(year: number, isWinterSemester: boolean): Promise<Response> {
    if (this.#session === "") {
      throw new Error("Invalid session, try logging in.");
    }

    const coursesBody: object = {
      request: {
        method: "POST",
        targetService: "as-studierende-anmeldeuebersicht",
        path: "/v2/anmeldung/semesters/anmeldungen",
        body: `["${year}${isWinterSemester ? "W" : "S"}"]`,
      },
    };

    const coursesRequest: UspaceRequest = new UspaceRequest(
      UspaceRequest.coursesURL,
      "POST",
      this.getSession,
      coursesBody,
    );
    const coursesResponse: Response = await coursesRequest.send();

    if (!coursesResponse.ok) {
      return new Response('Could not fetch courses, session may have expired.', { status: 403 });
    }
  
    const courses = await coursesResponse.json();
    return new Response(JSON.stringify(courses), { status: 200 });
  }
}
