import { Component, Input, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  userName?: string;

  items: MenuItem[] = [];

  ngOnInit() {
        this.items.push(
          {
            label: 'Departamentos',
            icon: 'pi pi-pw pi-book',
            items: [
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-list',
                routerLink: '/departments'
              },
              {
                label: 'Agregar',
                icon: 'pi pi-fw pi-pencil',
                routerLink: '/department'
              },
              { separator: true },
            ]
          },
          {
            label: 'Empresas',
            icon: 'pi pi-pw pi-users',
            items: [{
              label: 'Listar',
              icon: 'pi pi-fw pi-list',
              routerLink: '/businesses'
            },
            {
              label: 'Agregar',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: '/business'
            },
            { separator: true },
            ]
          },
        );
      }
}
