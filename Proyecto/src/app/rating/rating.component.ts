import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  @Input() rating: number;

  stars: Array<number> = [0,0,0,0,0]

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let aux = changes['rating'].currentValue;
    for (let i = 0; i < this.stars.length; i++) {
      if (aux - 1 >= 0) {
        this.stars[i] = 1;
        aux = aux-1;
      } else if (aux - 1 == -1) {
        this.stars[i] = 0;
      } else if (aux - 1 >= -0.5) {
        this.stars[i] = 0.5;
        aux = 0;
      } else {
        this.stars[i] = 0;
        aux = 0;
      }
    }
  }
}
