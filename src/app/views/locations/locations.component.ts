import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from 'src/app/models/Location';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/LocationService/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  departmentId: number | undefined;
  locationsDepartment: Location[] = [];

  public locationForm: FormGroup = new FormGroup({});
  public editarLocationForm: FormGroup = new FormGroup({});

  displayAgregarLocationDialog: boolean = false;
  displayEditarLocationDialog: boolean = false;

  selectedLocation: any = {};
  cols: any[] = [];

  constructor(
    private locationService: LocationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.departmentId = Number(routeParams.get('departmentId'));

    this.locationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.editarLocationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.getLocationsDepartment(this.departmentId);

    this.cols = [
      { field: 'name', header: 'Nombre' },
    ];
  }

  ngOnSubmit() {
    let location = new Location();
    location.name = this.locationForm.controls.name.value;
    location.departmentId = this.departmentId;

    console.log(location);

    this.locationService.postLocations(location).subscribe(
      response => {

        this.locationForm.reset;
        if(this.departmentId) this.getLocationsDepartment(this.departmentId);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Localidad creada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la localidad' });
      }
    );

    this.displayAgregarLocationDialog = false;
  }

  getLocationsDepartment(departmentId: number) {
    // Get localidades de un departamento
    this.locationService.getLocationsDepartment(departmentId).subscribe(
      result => {
        this.locationsDepartment = result;
      }
    );
  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar la localidad?',
      accept: () => {
        this.locationService.deleteLocation(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Localidad eliminada exitosamente' });
            if (this.departmentId) this.getLocationsDepartment(this.departmentId);
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la localidad cancelada' })
    });
  }

  ngOnEdit(): void {
    let location = new Location();
    location.id = this.selectedLocation.id;
    location.name = this.editarLocationForm.controls.name.value;
    location.departmentId = this.departmentId;

    this.locationService.putLocation(location).subscribe(
      response => {
        if(this.departmentId) this.getLocationsDepartment(this.departmentId);
        this.displayEditarLocationDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Localidad modificada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar la localidad' });
      }
    );
  }

  showAgregarClaseDialog(): void {
    this.displayAgregarLocationDialog = true;
  }

  showEditarClaseDialog(location: Location): void {

    this.selectedLocation = location;

    this.displayEditarLocationDialog = true;

  }
  
}


