import { Component, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latest=[];
  best=[];
  shops;
  latestShops=[];
  loading = true;
  constructor(private db: MarketPlaceDBService) { }

  ngOnInit(): void {
  this.getProducts()
  this.getAllShops()
  }



  getProducts() {
    this.db.findAllProducts().subscribe(
      (response) => {
        let products = [];
        if (response["products"]) {
          response["products"].forEach((item) =>{
            let newProduct = item;
            products.push(newProduct);
          });
          for(let i=0;i<=11;i++){
            this.latest[i]=products[i];
          }
          console.table(this.latest)
          for(let z=0;z<(products.length-1);z++){
            for(let j=z+1;j<products.length;j++){
                if(Number.parseFloat(products[z].price)<Number.parseFloat(products[j].price)){
                    //Intercambiamos valores
                    let aux=products[z]
                    products[z]=products[j]
                    products[j]=aux
 
                }
            }
        }
        
        this.best=products
          this.loading = false;


        }
        console.table(products)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
    }

    getAllShops() {
      this.db.findAllShops().subscribe(
        (response) => {
          this.shops = [];
          if (response["shops"]) {
            response["shops"].forEach((item) =>{
              let newShop = item;
              this.shops.push(newShop);
            });
            for(let i=0;i<=3;i++){
              this.latestShops[i]=this.shops[i];
            }
            console.table(this.latestShops)
            this.loading = false;
  
          }
          console.table(this.shops)
        },
        (error) => {
          console.error('Request failed with error');
          console.error(error);
        });
    
      }

}
