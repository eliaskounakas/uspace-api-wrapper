export default class UspaceRequest {
    #private;
    static sessionURL: string;
    static loginURL: string;
    static coursesURL: string;
    constructor(url: string, method: string, cookies: string, body: object);
    send(): Promise<Response>;
}
//# sourceMappingURL=UspaceRequest.d.ts.map