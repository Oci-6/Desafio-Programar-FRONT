import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from 'src/app/models/Business';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private url: string = "http://localhost:3000/api/reports"

  constructor(private http: HttpClient) { }

  countActives() {
    return this.http.get<{COUNT: number}>(this.url + '/countActives/');
  }

  listByActivity(activity: string) {
    return this.http.get<Business[]>(this.url + '/listByActivity/' + activity);
  }

  countByLocation(locationId: number) {
    return this.http.get<{COUNT: number}>(this.url + '/countByLocation/' + locationId);
  }
  
}

