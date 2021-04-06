import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  constructor(private db: MarketPlaceDBService,private router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.db.createClientUser().subscribe(
      (response) => {

      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  }

}
