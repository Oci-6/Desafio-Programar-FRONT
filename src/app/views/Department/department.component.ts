import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { Message } from 'src/app/models/Message';
import { DepartmentService } from 'src/app/services/DepartamentService/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

 
  message: Message | undefined;

  public deparmentForm: FormGroup = new FormGroup({});
  

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.deparmentForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
  });
  }

  ngOnSubmit(){
    let department = new Department();
    department.name = this.deparmentForm.controls.nombre.value;

    this.departmentService.postDepartment(department).subscribe(
        response => {
            let msg = new Message();
            msg.type = 'success';
            msg.msg = 'Creacion de Departamento exitosa';

            this.message = msg;
        },
        error => {
            let msg = new Message();
            msg.type = 'error';
            msg.msg = 'Error';

            this.message = msg;
        }
    );
  }
}
