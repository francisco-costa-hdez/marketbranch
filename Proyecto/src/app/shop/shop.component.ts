import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shop;
  loading: boolean = true;
  show: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    this.getShop(this.route.snapshot.paramMap.get('id'));
  }

  chosePrincipal() {
    alert("esto quiero hacerlo con los datos devueltos de la api pa no trabajar doble:)");
  }

  toggleGallery(state:boolean) {
    this.show = state;
  }

  getShop(id: string | number) {
    this.db.findShopById(id).subscribe(
      (response) => {
        if (response["shop"]) {
          this.shop = response["shop"];
          this.loading = false;
        console.log(this.shop)
      }},
      (error) =>  {});
    // this.movie = this.datos.getThisPelicula(id);
    // console.table(this.movie);
  }
}
