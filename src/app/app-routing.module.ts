import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BusinessComponent } from './views/Business/business/business.component';
import { BusinessTableComponent } from './views/BusinessTable/business-table/business-table.component';
import { DepartmentComponent } from './views/Department/department/department.component';
import { DepartmentsComponent } from './views/Departments/departments/departments.component';
import { LocationsComponent } from './views/locations/locations.component';
import { LoginComponent } from './views/login/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'businesses',
    component: BusinessTableComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'locations/:departmentId',
    component: LocationsComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
