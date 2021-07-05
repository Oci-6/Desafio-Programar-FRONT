import { Component, Input, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input()
  userName?: string;

  constructor(private auth: AuthService) {}

  items: MenuItem[] = [];

  ngOnInit() {
    let user: any = this.auth.getUserLogged();

    if (user) {
      if (
        user.roles.find((elem: { name: string; }) => {
          return elem.name == 'Admin';
        })
      ) {
        this.items.push(
          {
            label: 'Departamentos',
            icon: 'pi pi-pw pi-book',
            items: [
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-list',
                routerLink: '/departments',
              },
              {
                label: 'Agregar',
                icon: 'pi pi-fw pi-pencil',
                routerLink: '/department',
              },
              { separator: true },
            ],
          },
          {
            label: 'Empresas',
            icon: 'pi pi-pw pi-users',
            items: [
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-list',
                routerLink: '/businesses',
              },
              {
                label: 'Agregar',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: '/business',
              },
              { separator: true },
            ],
          },
          {
            label: 'Personas',
            icon: 'pi pi-pw pi-users',
            routerLink: '/persons',
          }
        );
      } else {
        this.items.push(
          {
            label: 'Mi Empresa',
            icon: 'pi pi-pw pi-book',
            routerLink: '/miEmpresa',
          }
        );
      }
    }
  }
}
