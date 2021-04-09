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
  products;
  aux;
  best = [];

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
        if (response) {
          this.shop = response["shop"];
          this.loading = false;
          //console.log(this.shop)
          if (this.shop) {
            this.getProducts(id);
          }
        };
      }, (error) =>  {});
      
  }

  getProducts(id) {
    this.db.findProductByShop(id).subscribe(
      (response) => {
        this.products = [];
        this.aux = [];
        if (response["products"]) {
          response["products"].forEach((item) => {
            this.products.push(item);
          });
          this.aux = [...this.products];
          //console.table(this.products);
          //console.table(this.aux);
          this.aux.sort(function(a, b){
            return b.price - a.price;
          });
          for(let i = 0; i <= 11; i++) {
            if (i < this.aux.length) {
              this.best[i] = this.aux[i];
            }
          }
          this.aux = [...this.products];
          //console.table(this.aux)
          //console.table(this.best
        }
        //console.table(this.products)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
  }

  orderProducts(order) {
    console.log("cambiar el orden a :" + order.value)
    switch (order.value) {
      case "reciente": {
        console.log("pre")
        console.table(this.products);
        console.table(this.aux);
        this.products = [...this.aux];
        console.log("post")
        console.table(this.products);
        console.table(this.aux);
        break;
      };
      case "antiguo": {
        console.log("pre")
        console.table(this.products);
        console.table(this.aux);
        this.products = [...this.aux];
        this.products.reverse();
        console.log("post")
        console.table(this.products);
        console.table(this.aux);
        break;
      };
      case "mejor": {
        console.log("pre")
        console.table(this.products);
        console.table(this.aux);
        this.products.sort(function(a, b){
          return b.price - a.price;
        });
        console.log("post")
        console.table(this.products);
        console.table(this.aux);
        break;
      };
      case "peor": {
        console.log("pre")
        console.table(this.products);
        console.table(this.aux);
        this.products.sort(function(a, b){
          return a.price - b.price;
        });
        console.log("post")
        console.table(this.products);
        console.table(this.aux);
        break;
      };
      default: {
        order.value="reciente"
        this.products = [...this.aux];
        break;
      }
    }
  }
}
