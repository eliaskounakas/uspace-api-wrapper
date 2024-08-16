export default class UspaceClient {
    #private;
    constructor(session?: string);
    get getSession(): string;
    set setSession(session: string);
    login(username: string, password: string): Promise<Response>;
    getCourses(year: number, isWinterSemester: boolean): Promise<Response>;
}
//# sourceMappingURL=UspaceClient.d.ts.map