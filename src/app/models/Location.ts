import { Department } from "./Department";

export class Location {
    id?: number | undefined;
    name?: string | undefined;
    department?: Department | undefined;
    departmentId?: number | undefined;
    count?: number;

    constructor() { }
}