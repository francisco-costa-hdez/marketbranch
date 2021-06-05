import { Injectable } from '@angular/core';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private image;

  constructor( private db: MarketPlaceDBService ) { }

  getImage() {
    return this.image;
  }

  deleteImage() {
    this.image;
  }

  setImage(image) {
    this.image = image;
  }
}