import { Business } from "./Business";
import { Person } from "./Person";

export interface Business_Person {
    id?: number;
    businessId?: number;
    personId?: number;
    tipo: string;
    person?: Person;
    business?: Business;
}