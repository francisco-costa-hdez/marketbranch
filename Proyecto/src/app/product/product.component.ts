import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  focusedImage = "assets/Images/descarga (1).png"
  focusedImage1 = "assets/Images/limon-eco.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
