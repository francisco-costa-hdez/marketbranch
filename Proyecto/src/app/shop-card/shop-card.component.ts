import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit {
  @Input() shop;
  constructor() { }

  ngOnInit(): void {
  }

}
