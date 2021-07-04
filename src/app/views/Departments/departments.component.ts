import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/DepartamentService/department.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor(
    private departmentService: DepartmentService,
    private messageService: MessageService) { }

  cols: any[] = [];

  departments: Department[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
    ];

    this.departmentService.getDepartments().subscribe(
      (response) => {
        this.departments=response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });
      }
    )
  }
}
