import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/DepartamentService/department.service';
import { TableModule } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  message: Message | undefined;

  public editarDepartmentForm: FormGroup = new FormGroup({});
  displayEditarDepartmentDialog: boolean = false;

  departmentId: number | undefined;
  selectedDepartment: any = {};

  constructor(
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  cols: any[] = [];

  departments: Department[] = [];

  ngOnInit(): void {
    this.cols = [

      { field: 'name', header: 'Nombre' },
    ];

    this.departmentService.getDepartments().subscribe(
      (response) => {
        this.departments = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });
      }
    )
    this.editarDepartmentForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar la localidad?',
      accept: () => {
        this.departmentService.deleteDepartment(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Departamento eliminado exitosamente' });
            this.departmentService.getDepartments();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error en el servidor' })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación del departamento cancelada' })
    });
  }

  ngOnEdit(): void {
    let department = new Department();
    department.id = this.selectedDepartment.id;
    department.name = this.editarDepartmentForm.controls.name.value;
    console.log(department);

    this.departmentService.putDepartment(department).subscribe(
      response => {
        this.departmentService.getDepartments();
        this.displayEditarDepartmentDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Departamento modificado exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error al modificar el departamento' });
      }
    );
  }

  
  showEditarDepartmentDialog(department: Location): void {

    this.selectedDepartment = department;

    this.displayEditarDepartmentDialog = true;

  }


}
