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
        let aux = [];
        if (response["products"]) {
          response["products"].forEach((item) => {
            let newProduct = item;
            this.products.push(newProduct);
            aux.push(newProduct);
          });
          //console.table(aux);
          for(let z=0;z<(aux.length-1);z++) {
            for(let j=z+1;j<aux.length;j++) {
              if(Number.parseFloat(aux[z].price)<Number.parseFloat(aux[j].price)){
                //Intercambiamos valores
                let au =aux[z];
                aux[z]=aux[j];
                aux[j]=au;
              }
            }
          }
          for(let i = 0; i <= 11; i++) {
            if (i < aux.length) {
              this.best[i]=aux[i];
            }
          }
          //console.table(aux)
        }
        //console.table(this.products)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
    }
}
