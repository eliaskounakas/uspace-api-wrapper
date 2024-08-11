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

  async login(username: string, password: string): Promise<void> {
    const sessionResponse: Response = await fetch(UspaceRequest.sessionURL);
    if (!sessionResponse.ok) {
      throw new Error("Could not reach uspace!");
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

    if (!loginResponse.ok) {
      throw new Error("Invalid username/password!");
    }
    const loginCookies: string = String(loginResponse.headers.get("set-cookie"));
    cookieHandler.mergeCookies(loginCookies);

    this.#session = cookieHandler.getCookies;
  }

  async getCourses(year: number, isWinterSemester: boolean): Promise<CourseData[]> {
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
      throw new Error ("Could not retrieve courses! Session may have expired!");
    }
  
    const courses = await coursesResponse.json();
    return courses;
  }
}
