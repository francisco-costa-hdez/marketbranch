import { Injectable } from '@angular/core';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {

  private categories = [];

  constructor( private db: MarketPlaceDBService ) { 
    this.setCategories();
  }

  getCategories() {
    return this.categories;
  }

  clearCategories() {
    this.categories = [];
  }

  getCategoryId(name: string) {
    let id = 0;
    if(name.length > 0) {
      if (this.categories.length) {
        this.categories.forEach((category) => {
          if (category.name.localeCompare(name) == 0) {
            id = category.id;
          }
        });
      }
    }
    return id;
  }

  getCategoryName(id: string) {
    let name = "";
    if(Number(id) > 0) {
      if (this.categories.length) {
        this.categories.forEach((category) => {
          if (category.id.toString() == (id)) {
            name = category.name;
          }
        });
      }
    }
    return name;
  }

  setCategoriesFromArray(categoryArray: Array<any>) {
    this.categories = [...categoryArray];
  }

  setCategories() {
    this.db.findAllCategories().subscribe(
      (response) => {
        this.categories = [];
        if (response["categories"]) {
          response["categories"].forEach((item) =>{
            this.categories.push(item);
          });
        }
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
    });
  }
}