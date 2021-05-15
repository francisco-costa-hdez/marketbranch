import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validarIguales } from '../app.validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editDetails: boolean = false;
  detailsForm: FormGroup;
  user = { "name" : "felipo",
           "tlf" : "123412341",
           "email" : "tusganas",
           "address": "minecraft"
  };

  constructor(private form: FormBuilder) {
    // this.detailsForm = this.form.group(
    //   {
    //     name:['',Validators.required],
    //     tlf:['',Validators.compose([Validators.minLength(9),Validators.required])],
    //     email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
    //     address:['',Validators.required]
    //   }
    //   , {
    //     validators: validarIguales
    //   }
    // )

    this.detailsForm = new FormGroup({
      name: new FormControl({value: this.user["name"], disabled: true}, Validators.required),
      tlf: new FormControl({value: this.user["tlf"], disabled: true}, Validators.required),
      email: new FormControl({value: this.user["email"], disabled: true}, Validators.required),
      address: new FormControl({value: this.user["address"], disabled: true}, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get name() { return this.detailsForm.get('name'); }
  get tlf() { return this.detailsForm.get('tlf'); }
  get email() { return this.detailsForm.get('email'); }
  get address() { return this.detailsForm.get('address'); }

  edit() {
    if (this.editDetails) {
      
    } else {
      
    }
    this.editDetails = (this.editDetails) ? false : true;
    (this.editDetails) ? this.detailsForm.enable() : this.detailsForm.disable();
  }

  onSubmit() {
    console.log("helow")
  }

}
