import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  signIn(user: User){
    return this.http.post(this.URL + '/signin', user);
  }

  signUp(user: User){
    return this.http.post(this.URL + '/signup', user);
  }

  getUserInfo(){
    return this.http.get('http://localhost:3000/api/users/profile');

  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
}
}
