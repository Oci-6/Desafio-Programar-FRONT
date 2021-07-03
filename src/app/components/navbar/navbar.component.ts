import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  @Input()
  user: User | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      if (this.user) {
          this.items = [
              {
                  label: `Bienvenido ${this.user.userName}`,
                  icon: 'pi pi-user',
              },
              {
                  label: 'Salir',
                  icon: 'pi pi-sign-out',
                  command: this.authService.logout
              },
          ];
      } else {
          this.items = [
              {
                  label: 'Ingresar',
                  icon: 'pi pi-sign-in',
                  routerLink: ['/login']
              },
          ];
      }

  }
}
