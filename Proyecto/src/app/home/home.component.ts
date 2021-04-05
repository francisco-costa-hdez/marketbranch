import { Component, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  latest=[];
  loading = true;
  constructor(private db: MarketPlaceDBService) { }

  ngOnInit(): void {
  this.getProducts()
  }



  getProducts() {
    this.db.getAllProducts().subscribe(
      (response) => {
        this.products = [];
        if (response["products"]) {
          response["products"].forEach((item) => {
            let nuevoResultado = {
              id: item.id,
              name: item.name,
              price: item.price,
              discount: item.discount,
              shop_id: item.shop_id,
              media_rating: item.media_rating
            };
            this.products.push(nuevoResultado);
          });
          for(let i=0;i<=11;i++){
            this.latest[i]=this.products[i];
          }
          console.table(this.latest)
          this.loading = false;

        }
        console.table(this.products)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
    }

}
