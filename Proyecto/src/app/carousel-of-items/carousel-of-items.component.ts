import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-carousel-of-items',
  templateUrl: './carousel-of-items.component.html',
  styleUrls: ['./carousel-of-items.component.css']
})
export class CarouselOfItemsComponent implements OnInit {
  
  @Input() carouselId;
  @Input() latest=[];
  

  constructor( ) { }

  ngOnInit(): void {
    console.table(this.latest)
    
  }

  


}
