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

  getBusiness(id: number) {
    return this.http.get(this.URL + '/' + id);
  }

  putBusiness(business: Business) {
    return this.http.put(this.URL + "/" + business.id, business);
  }

  deleteBusiness(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }

  // addPerson(){
  //   return this.http.post(this.URL + '/addPerson' + );
  // }

  // putBP(){
  //   return this.http.put(this.URL + '/putBP' + );
  // }

  // deleteBP(id: number){
  //   return this.http.delete(this.URL + '/deleteBP' + id);
  // }
}

