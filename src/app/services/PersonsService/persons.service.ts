import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

private url: string = "http://localhost:3000/api/persons"

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get<Person[]>(this.url);
  }

  getPerson(id: number) {
    return this.http.get<Person>(this.url + '/' + id);
  }

  postPerson(person: Person) {
    return this.http.post(this.url, person);
  }

  putPerson(person: Person) {
    return this.http.put(this.url + '/' + person.id, person);
  }

  deletePerson(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
