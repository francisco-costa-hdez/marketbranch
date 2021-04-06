import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { ClientUser } from '../client-user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  constructor(private db: MarketPlaceDBService,private router: Router) { }

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

  createUser(){
    // this.db.createClientUser().subscribe(
    //   (response) => {

    //   },
    //   (error) => {
    //     console.error('Request failed with error');
    //     console.error(error);
    //   });
  }

}
