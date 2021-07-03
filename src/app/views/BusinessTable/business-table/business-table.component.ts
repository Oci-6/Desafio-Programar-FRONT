import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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



  constructor(
    private businessService: BusinessService,
    private messageService: MessageService) { }

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
          detail: 'Error interno del sistema',
        });
      }
    )
  }
}
