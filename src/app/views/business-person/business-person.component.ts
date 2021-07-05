import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Business_Person } from 'src/app/models/Business_Person';
import { Message } from 'src/app/models/Message';
import { Person } from 'src/app/models/Person';
import { BusinessService } from 'src/app/services/BusinessService/business.service';
import { PersonsService } from 'src/app/services/PersonsService/persons.service';

@Component({
  selector: 'app-business-person',
  templateUrl: './business-person.component.html',
  styleUrls: ['./business-person.component.css']
})
export class BusinessPersonComponent implements OnInit {

  businessId: number | undefined;

  message: Message | undefined;

  BP: Business_Person[] = [];
  public persons: Person[] = [];

  public addBPForm: FormGroup = new FormGroup({});
  public editarBPForm: FormGroup = new FormGroup({});

  displayAgregarBPDialog: boolean = false;
  displayEditarBPDialog: boolean = false;

  selectedBP: any = {};

  cols: any[] = [];

  constructor(
    private businessService: BusinessService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private personsService: PersonsService
  ) { }

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.businessId = Number(routeParams.get('id'));

    this.businessService.getBP(this.businessId).subscribe(
      result => {
        this.BP = result;
      }
    );

    this.personsService.getPersons().subscribe(
      result =>{
        this.persons = result;
      }
    );


    this.addBPForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      persons: new FormControl(''),
    });

    this.editarBPForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
    });

  }

  ngOnSubmit() {
    let BP: Business_Person = {
      personId: this.addBPForm.controls.persons.value,
      businessId: this.businessId,
      tipo: this.addBPForm.controls.type.value 
    };
    console.log(BP);
    

    this.businessService.addPerson(BP).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Persona agregada a la empresa exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Error al agregar la persona a la empresa' })
      }
    );
  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar esta persona de la empresa?',
      accept: () => {
        this.businessService.deleteBP(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Persona eliminada exitosamente de la empresa' });
            if (this.businessId) this.businessService.getBP(this.businessId);
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error en el servidor' })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la persona cancelada' })
    });
  }

  ngOnEdit(): void {
    let BP: Business_Person = {
      id: this.selectedBP.id, 
      personId: this.selectedBP.personId,
      businessId: this.selectedBP.businessId,
      tipo: this.editarBPForm.controls.type.value 
    };
    console.log(BP);
    

    this.businessService.putBP(BP).subscribe(
      response => {
        if (this.businessId) this.businessService.getBP(this.businessId);
        this.displayEditarBPDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Localidad modificada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error al modificar la localidad' });
      }
    );
  }

  showAgregarBPDialog(): void {
    this.displayAgregarBPDialog = true;
  }

  showEditarBPDialog(BP: Business_Person): void {

    this.selectedBP = BP;

    this.displayEditarBPDialog = true;

  }


}
