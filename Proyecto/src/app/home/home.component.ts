import { Component, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latest=[];
  best=[];
  user = "";

  contentLoaded = 0;
  latestShops=[];
  constructor(private db: MarketPlaceDBService,
              private storageService: LocalStorageService) { }

  ngOnInit(): void {
  this.getAllShops()
  this.getProducts()
  this.user = this.storageService.getCurrentUser();
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
          //console.table(this.latest)
          products.sort(function(a, b){
            return b.media_rating - a.media_rating;
          });
          for(let i=0;i<=11;i++){
            this.best[i]=products[i];
          }
          products = [];
          this.contentLoaded += 1;
        }
        //console.table(products)
      },
      (error) => {
        this.contentLoaded = -2;
        // console.error('Request failed with error');
        // console.error(error);
      }); 
    }
    getAllShops() {
    this.db.findAllShops().subscribe(
      (response) => {
        let shops = [];
        this.latestShops = [];
        if (response["shops"]) {
          response["shops"].forEach((item) =>{
            shops.push(item);
          });
          for(let i = 0, j = 0; j<= 3 && i < shops.length; i++){
            if (shops[i].name != null) {
              this.latestShops[j] = shops[i];
              j++
            }
          }
          //console.table(this.latestShops)
          this.contentLoaded += 1;
          
        }
        //onsole.table(shops)
        shops = [];
      },
      (error) => {
        this.contentLoaded = -2;
        // console.error('Request failed with error');
        // console.error(error);
      });
  }

}