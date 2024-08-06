export default class UspaceRequest {
	static sessionURL: string ="https://uspace.univie.ac.at/web/gast"
	static loginURL: string ="https://uspace.univie.ac.at/web/gast/login?p_p_id=ssploginportlet_WAR_ssploginportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=login&p_p_cacheability=cacheLevelPage"
	static coursesURL: string ="https://uspace.univie.ac.at/web/studium/anmeldeuebersicht?p_p_id=asstudierendeanmeldeuebersichtportlet_WAR_asstudierendeanmeldeuebersichtportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=_generic_request_&p_p_cacheability=cacheLevelPage"

	#url: string;
	#method: string;
	#cookies: string;
	#body: object;

	constructor(url: string, method: string, cookies: string, body: object) {
		this.#url = url;
		this.#method = method;
		this.#cookies = cookies;
		this.#body = body;
	}

	async send(): Promise<Response> {
		return await fetch(this.#url, {
			body: JSON.stringify(this.#body),
			method: this.#method,
			headers: {
				Cookie: this.#cookies,
			},
		});
	}
}
