import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user: any = this.auth.getUserLogged();

    if (user) {
      if(user.roles.find((elem: { name: string }) => {
        return elem.name == 'Admin';
      })) {
        return true;
      }
    }
    
    return false;
  }
}
