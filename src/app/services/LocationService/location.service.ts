import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Location } from 'src/app/models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private URL = 'http://localhost:3000/api/locations';

  public locations: Location[] = [];

  constructor(private http: HttpClient) { }

  getLocationsDepartment(idDepartment: number){
    return this.http.get<Location[]>(`${this.URL}/Department/${idDepartment}`);
  }

  getLocations() {
    return this.http.get<Location[]>(this.URL);
  }

  postLocations(location: Location) {
    return this.http.post(this.URL, location);
  }

  getLocation(locationName: string) {
    return this.http.get(`${this.URL}/${locationName}`);
  }

  putLocation(location: Location) {
    return this.http.put(`${this.URL}/${location.id}`, location);
  }

  deleteLocation(locationId: number) {
    return this.http.delete(`${this.URL}/${locationId}`);
  }
}
