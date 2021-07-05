import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/models/Business';
import { Department } from 'src/app/models/Department';
import { Location } from 'src/app/models/Location';
import { Message } from 'src/app/models/Message';
import { BusinessService } from 'src/app/services/BusinessService/business.service';
import { DepartmentService } from 'src/app/services/DepartamentService/department.service';
import { LocationService } from 'src/app/services/LocationService/location.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  message: Message | undefined;

  public departments: Department[] = [];
  public locations: Location[] = [];

  initDate = '';

  public businessForm: FormGroup = new FormGroup({});


  constructor(
    private businessService: BusinessService,
    private departmentService: DepartmentService,
    private locationService: LocationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.businessForm = new FormGroup({
      nombreFantasia: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required]),
      razonSocial: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      direccion: new FormControl('',),
      celular: new FormControl('',),
      telefono: new FormControl('',),
      bps: new FormControl('',),
      rubro: new FormControl('',),
      observaciones: new FormControl('',),
      departments: new FormControl(''),
      locations: new FormControl(''),
      initDate: new FormControl(''),
      logo: new FormControl(''),
    });

    this.departmentService.getDepartments().subscribe(
      result => {
        this.departments = result;
      }
    );

  }

  ngOnSubmit() {
    let business = new Business();
    business.businessName = this.businessForm.controls.razonSocial.value;
    business.nameFantasy = this.businessForm.controls.nombreFantasia.value;
    business.rut = this.businessForm.controls.rut.value;
    business.email = this.businessForm.controls.email.value;
    business.address = this.businessForm.controls.direccion.value;
    business.cellphone = this.businessForm.controls.celular.value;
    business.phone = this.businessForm.controls.telefono.value;
    business.BPS = this.businessForm.controls.bps.value;
    business.occupation = this.businessForm.controls.rubro.value;
    business.observations = this.businessForm.controls.observaciones.value;
    business.departmentId = this.businessForm.controls.departments.value;
    business.locationId = this.businessForm.controls.locations.value;
    business.initDate = this.businessForm.controls.initDate.value;
    business.logo = this.businessForm.controls.logo.value;
    

    console.log(business);
    
    this.businessService.postBusiness(business).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empresa agregada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Error al agregar la empresa' })
      }
    );
  }

  getLD() {
    let id = this.businessForm.controls.departments.value;
    this.departmentService.getDepartment(id).subscribe(
      result => {
        if (result.locations) this.locations = result.locations;
      }
    );
  }

  convertirFecha(fecha: Date) {

    return moment(fecha).format("DD-MM-YYYY");

  }
}
