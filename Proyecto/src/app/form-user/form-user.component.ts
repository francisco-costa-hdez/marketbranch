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


  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder) { 
    this.signform=this.form.group({
      name:['',Validators.required],
      address:['',Validators.required],
      tlf:['',Validators.required],
      email:['',Validators.required],
      profile_img:['',Validators.required],
      password:['',Validators.required],
    })
  }

  /*registerForm=this.form.group({
    name:[''],
    address:[''],
    tlf:[''],
    email:[''],
    Check1:[true]
  })*/

  client = new ClientUser;

  ngOnInit(): void {
  }
  
  onSubmit() {
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
