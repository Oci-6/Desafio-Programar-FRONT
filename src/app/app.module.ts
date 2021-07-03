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
import { MenuComponent } from './components/menu/menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentsComponent } from './views/Departments/departments/departments.component';
import { DepartmentComponent } from './views/Department/department/department.component';
import { TableModule } from 'primeng/table';
import { LoginGuard } from './guards/login.guard';
import { BusinessComponent } from './views/Business/business/business.component';
import { BusinessTableComponent } from './views/BusinessTable/business-table/business-table.component';
import { LocationsComponent } from './views/locations/locations.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    DepartmentsComponent,
    DepartmentComponent,
    BusinessComponent,
    BusinessTableComponent,
    LocationsComponent
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
    PanelMenuModule,
    BrowserAnimationsModule,
    TableModule,
  ],
  providers: [    
    MessageService,
    AuthService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
