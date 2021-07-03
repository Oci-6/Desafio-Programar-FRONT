import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { AuthInterceptor } from './services/AuthService/auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService,  } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './services/AuthService/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PasswordModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    DividerModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [    
    MessageService,
    AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
