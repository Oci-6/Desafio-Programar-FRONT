import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/models/Business';
import { Message } from 'src/app/models/Message';
import { BusinessService } from 'src/app/services/BusinessService/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  message: Message | undefined;

  public deparmentForm: FormGroup = new FormGroup({});
  

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.deparmentForm = new FormGroup({
      nombreFantasia: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required]),
      razonSocial: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      direccion: new FormControl('', ),
      celular: new FormControl('', ),
      telefono: new FormControl('', ),
      bps: new FormControl('', ),
      rubro: new FormControl('', ),
      observaciones: new FormControl('', ),
  });
  }

  ngOnSubmit(){
    let business = new Business();
    business.businessName = this.deparmentForm.controls.razonSocial.value;
    business.nameFantasy = this.deparmentForm.controls.nombreFantasia.value;
    business.rut = this.deparmentForm.controls.rut.value;
    business.email = this.deparmentForm.controls.email.value;
    business.address = this.deparmentForm.controls.direccion.value;
    business.cellphone = this.deparmentForm.controls.celular.value;
    business.phone = this.deparmentForm.controls.telefono.value;
    business.BPS = this.deparmentForm.controls.bps.value;
    business.occupation = this.deparmentForm.controls.rubro.value;
    business.observations = this.deparmentForm.controls.observaciones.value;

    this.businessService.postBusiness(business).subscribe(
        response => {
            let msg = new Message();
            msg.type = 'success';
            msg.msg = 'Creacion de Empresa exitosa';

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
