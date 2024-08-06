export default class CookieHandler {
	#cookies: string;

	constructor(cookies: string) {
		this.#cookies = this.#filterRawCookies(cookies);
	}

	get getCookies() {
		return this.#cookies;
	}

	set setCookies(cookies: string) {
		this.#cookies = this.#filterRawCookies(cookies);
	}

	#filterRawCookies(rawCookies: string): string {
		let cookies: string[] = rawCookies.split(",");
		cookies = cookies.map((cookie) => cookie.split(";")[0]);
		cookies = cookies.filter((cookie) => cookie.includes("="));
		cookies = cookies.map((cookie) => cookie.trim());
		return cookies.join("; ");
	}

	mergeCookies(incomingRawCookies: string) {
		const incomingCookies: string = this.#filterRawCookies(incomingRawCookies);
		const cookiesMap: Map<string, string> = new Map();
		let mergedCookies = "";

		const currentCookiesArray: string[] = this.#cookies.split(";");
		const incomingCookiesArray: string[] = incomingCookies.split(";");

		for (const cookie of currentCookiesArray) {
			const key: string = cookie.split("=")[0];
			const value: string = cookie.split("=")[1];
			cookiesMap.set(key, value);
		}

		for (const cookie of incomingCookiesArray) {
			const key: string = cookie.split("=")[0];
			const value: string = cookie.split("=")[1];
			cookiesMap.set(key, value);
		}

		cookiesMap.forEach((value, key) => {
			mergedCookies += `${key}=${value};`;
		});

		this.#cookies = mergedCookies;
	}
}
