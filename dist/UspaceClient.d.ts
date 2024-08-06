export default class UspaceClient {
    #private;
    constructor(session?: string);
    get getSession(): string;
    set setSession(session: string);
    login(username: string, password: string): Promise<void>;
    getCourses(year: number, isWinterSemester: boolean): Promise<unknown>;
}
//# sourceMappingURL=UspaceClient.d.ts.map