import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LoginGuard } from './guards/login.guard';
import { BusinessPersonComponent } from './views/business-person/business-person.component';
import { BusinessComponent } from './views/Business/business.component';
import { BusinessTableComponent } from './views/BusinessTable/business-table.component';
import { DepartmentComponent } from './views/Department/department.component';
import { DepartmentsComponent } from './views/Departments/departments.component';
import { LocationsComponent } from './views/locations/locations.component';
import { LoginComponent } from './views/login/login.component';
import { PersonsGridComponent } from './views/PersonsGrid/persons-grid.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'persons/business/:id',
    component: BusinessPersonComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'businesses',
    component: BusinessTableComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'locations/:departmentId',
    component: LocationsComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'persons',
    component: PersonsGridComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'miEmpresa',
    component: BusinessTableComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
