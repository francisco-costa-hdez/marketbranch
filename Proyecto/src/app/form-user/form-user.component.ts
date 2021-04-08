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
    this.signform=this.form.group({
      name:['',Validators.required],
      address:['',Validators.required],
      tlf:['',Validators.required],
      email:['',Validators.required],
      profile_img:[''],
      password:['',Validators.required],
    })
  }

  get name() { return this.signform.get('name'); }
  get email() { return this.signform.get('email'); }
  get address() { return this.signform.get('address'); }
  get tlf() { return this.signform.get('tlf'); }
  get img() { return this.signform.get('profile_img'); }
  get password() { return this.signform.get('password'); }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.client.name=this.name.value
    this.client.email=this.email.value
    this.client.tlf=this.tlf.value
    this.client.password=this.password.value
    this.client.address=this.address.value
    this.client.profile_img=this.img.value

    console.log(this.client)
    let arrayClient = {"name": this.client.name, "email": this.client.email, "tlf": this.client.tlf, "profile_img": this.client.profile_img, "address": this.client.address, "password": this.client.password}
    console.log(arrayClient)
    let jsonClient = JSON.stringify(this.client)
    console.log(jsonClient)
    let jsonArrayClient = JSON.stringify(arrayClient)
    console.log(jsonArrayClient)
    this.db.createClientUser(this.client).subscribe();
  }

}
