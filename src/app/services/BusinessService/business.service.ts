import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from 'src/app/models/Business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private URL = 'http://localhost:3000/api/businesses';

  constructor(private http: HttpClient) { }

  getBusinesses() {
    return this.http.get<Business[]>(this.URL);
  }

  postBusiness(Business: Business) {
    return this.http.post(this.URL, Business);
  }

  getBusiness(rut: string) {
    return this.http.get(this.URL + '/' + rut);
  }

  putBusiness(Business: Business, rut: string) {
    return this.http.put(this.URL + "/" + rut, Business);
  }

  deleteBusiness(rut: string) {
    return this.http.delete(this.URL + '/' + rut);
  }
}
