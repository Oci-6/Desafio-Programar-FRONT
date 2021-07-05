import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  private URL = 'http://localhost:3000/api/departments';

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<Department[]>(this.URL);
  }

  postDepartment(Department: Department) {
    return this.http.post(this.URL, Department);
  }
  
  getDepartment(departmentId: number) {
    return this.http.get<Department>(this.URL + '/' + departmentId);
  }

  putDepartment(department: Department) {
    return this.http.put(this.URL+"/"+ department.id, department);
  }
 
  deleteDepartment(departmentId: number) {
    return this.http.delete(this.URL + '/' + departmentId);
  }
}
