import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { ClientUser } from '../client-user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

 signform:FormGroup

 client = new ClientUser;

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder) { 
    this.signform=this.form.group(
      {
      name:['',Validators.required],
      address:['',Validators.required],
      tlf:['',Validators.compose([Validators.minLength(9),Validators.required])],
      email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
      profile_img:[''],
      password:['',Validators.compose([Validators.minLength(8),Validators.required])],
      password2:['',Validators.required]
    }
    )
  }

  get name() { return this.signform.get('name'); }
  get email() { return this.signform.get('email'); }
  get address() { return this.signform.get('address'); }
  get tlf() { return this.signform.get('tlf'); }
  get img() { return this.signform.get('profile_img'); }
  get password() { return this.signform.get('password'); }
  get password2() { return this.signform.get('password2'); }

  ngOnInit(): void {
  }
  
  onSubmit() {
    
    if(this.signform.valid){
    this.client.name=this.name.value
    this.client.email=this.email.value
    this.client.tlf=this.tlf.value
    this.client.password=this.password.value
    this.client.address=this.address.value
    this.client.profile_img=this.img.value
  }

    console.log(this.client)
    let arrayClient = {"name": this.client.name, "email": this.client.email, "tlf": this.client.tlf, "profile_img": this.client.profile_img, "address": this.client.address, "password": this.client.password}
    console.log(arrayClient)
    let jsonClient = JSON.stringify(this.client)
    console.log(jsonClient)
    let jsonArrayClient = JSON.stringify(arrayClient)
    console.log(jsonArrayClient)
    this.db.createClientUser(this.client).subscribe(
      (response) => {
        console.log("Todo ha ido bien")
      },
      (error) => {
        console.log("Se ha produsido un error");
        console.log(error)
        
      }); 
    
  }

  /*isValidField(field:string):boolean{
    return (this.signform.get(field).touched || this.signform.get(field).dirty ) && this.signform.get(field).valid
  }

  getError(field:string):string{
    let message

    if(this.signform.get(field).errors.required){
      message='no has introducido datos'
    }
    else{
      message='email invalido'
    }
    return message

  }*/

}