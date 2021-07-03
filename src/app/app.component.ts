import { Component } from '@angular/core';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio-Programar-FRONT';

  user: User | undefined;

  ngOnInit(): void {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      this.user = JSON.parse(usuario);
    }
  }
}
