import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Business } from 'src/app/models/Business';
import { Message } from 'src/app/models/Message';
import { BusinessService } from 'src/app/services/BusinessService/business.service';

@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.css']
})
export class BusinessTableComponent implements OnInit {


  message: Message | undefined;

  public editarBusinessForm: FormGroup = new FormGroup({});
  displayEditarBusinessDialog: boolean = false;

  businessId: number | undefined;
  selectedBusiness: any = {};


  constructor(
    private businessService: BusinessService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  cols: any[] = [];

  businesses: Business[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'rut', header: 'RUT' },
      { field: 'businessName', header: 'Razon Social' },
      { field: 'nameFantasy', header: 'Nombre Fantasia' },
      { field: 'email', header: 'Email' },
    ];

    this.businessService.getBusinesses().subscribe(
      (response) => {
        this.businesses = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });
      }
    )

    this.editarBusinessForm = new FormGroup({
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
    });

  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar la empresa?',
      accept: () => {
        this.businessService.deleteBusiness(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empresa eliminada exitosamente' });
            this.businessService.getBusinesses();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error en el servidor' })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la empresa cancelada' })
    });
  }

  ngOnEdit(): void {
    let business = new Business();
    business.id = this.selectedBusiness.id;
    business.businessName = this.editarBusinessForm.controls.razonSocial.value;
    business.nameFantasy = this.editarBusinessForm.controls.nombreFantasia.value;
    business.rut = this.editarBusinessForm.controls.rut.value;
    business.email = this.editarBusinessForm.controls.email.value;
    business.address = this.editarBusinessForm.controls.direccion.value;
    business.cellphone = this.editarBusinessForm.controls.celular.value;
    business.phone = this.editarBusinessForm.controls.telefono.value;
    business.BPS = this.editarBusinessForm.controls.bps.value;
    business.occupation = this.editarBusinessForm.controls.rubro.value;
    business.observations = this.editarBusinessForm.controls.observaciones.value;

    this.businessService.putBusiness(business).subscribe(
      response => {
        this.businessService.getBusinesses();
        this.displayEditarBusinessDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empresa modificada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error al modificar la empresa' });
      }
    );
  }

  
  showEditarBusinessDialog(business: Location): void {

    this.selectedBusiness = business;

    this.displayEditarBusinessDialog = true;

  }

  goDown(id:number){
    this.businessService.goDown(id).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empresa dada de baja exitosamente' });
        this.businessService.getBusinesses();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error al dar de baja la empresa' });
      }
    );
  }

}
