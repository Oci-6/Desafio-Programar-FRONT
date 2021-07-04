import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Person } from 'src/app/models/Person';
import { PersonsService } from 'src/app/services/PersonsService/persons.service';

@Component({
  selector: 'app-persons-grid',
  templateUrl: './persons-grid.component.html',
  styleUrls: ['./persons-grid.component.css']
})
export class PersonsGridComponent implements OnInit {

  cols: any[] = [];

  persons: Person[] = [];

  addPersonForm: FormGroup = new FormGroup({});
  updatePersonForm: FormGroup = new FormGroup({});

  constructor(private personsService: PersonsService, private messageService: MessageService) { }

  getPersons() {
    this.personsService.getPersons().subscribe(
      response => this.persons = response,
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  ngOnInit(): void {
    this.getPersons();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Telefono' },
    ];

    this.addPersonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })

    this.updatePersonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })
  }

  addPerson() {
    let newPerson: Person = {
      name: this.addPersonForm.controls.name.value,
      lastname: this.addPersonForm.controls.lastname.value,
      email: this.addPersonForm.controls.email.value,
      phone: this.addPersonForm.controls.phone.value,
    };

    this.personsService.postPerson(newPerson).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Persona agregada exitosamente' })
        this.getPersons();
        this.addPersonForm.reset();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  updatePerson() {
    let updatePerson: Person = {
      id: this.selectedPerson.id,
      name: this.updatePersonForm.controls.name.value,
      lastname: this.updatePersonForm.controls.lastname.value,
      email: this.updatePersonForm.controls.email.value,
      phone: this.updatePersonForm.controls.phone.value,
    };

    this.personsService.putPerson(updatePerson).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Persona modificada exitosamente' })
        this.getPersons();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  deletePerson(id: number) {
    this.personsService.deletePerson(id).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Persona eliminada exitosamente' })
        this.getPersons();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  displayAddPersonDialog: boolean = false;
  displayUpdatePersonDialog: boolean = false;

  selectedPerson: Person = {id: -1, name: '', lastname: '', email: '', phone: ''}

  showUpdatePersonDialog(person: Person) {
    this.selectedPerson = person
    this.displayUpdatePersonDialog = true;
  }

  showAddPersonDialog() {
    this.displayAddPersonDialog = true;
  }
}
