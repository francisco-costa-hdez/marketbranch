import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnChanges {

  @Input() review;
  owner: boolean = false;

  // user;
  constructor(private db: MarketPlaceDBService, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['review'].currentValue.client_user_id);
    console.log(this.auth.getCurrentUserId());
    if (changes['review'].currentValue.client_user_id) {
      if (this.auth.isAuthenticated) {
        console.log("owner" + this.owner)
        this.owner = (this.auth.getCurrentUserId() == changes['review'].currentValue.client_user_id) ? true : false;
      }
    }
  }
}
