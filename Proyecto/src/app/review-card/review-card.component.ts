import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnChanges {

  @Input() review;

  user;

  constructor(private db: MarketPlaceDBService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['review'].currentValue.client_user_id) {
      this.db.findClientUserById(changes['review'].currentValue.client_user_id).subscribe(
        (response) => {
          if (response) {
            console.log(response);
        }
      },
        (error) =>  {
          alert("el back tiene que devolver el nombre y el perfil. No lo puedo sacar.")
        });
    }
  }
}
