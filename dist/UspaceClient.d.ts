import type { CourseData } from "./entities";
export default class UspaceClient {
    #private;
    constructor(session?: string);
    get getSession(): string;
    set setSession(session: string);
    login(username: string, password: string): Promise<void>;
    getCourses(year: number, isWinterSemester: boolean): Promise<CourseData[]>;
}
//# sourceMappingURL=UspaceClient.d.ts.map