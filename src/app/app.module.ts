import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptor } from './services/AuthService/auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MessageService,  } from 'primeng/api';
import { AuthService } from './services/AuthService/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import { DepartmentsComponent } from './views/Departments/departments.component';
import { DepartmentComponent } from './views/Department/department.component';
import { LoginGuard } from './guards/login.guard';
import { BusinessComponent } from './views/Business/business.component';
import { BusinessTableComponent } from './views/BusinessTable/business-table.component';
import { LocationsComponent } from './views/locations/locations.component';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGModule } from './primeNg.module';
import { PersonsGridComponent } from './views/PersonsGrid/persons-grid.component';


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
    LocationsComponent,
    PersonsGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNGModule
  ],
  providers: [    
    MessageService,
    AuthService,
    ConfirmationService,
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
