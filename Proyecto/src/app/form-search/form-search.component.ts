import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { CategoryListService } from '../category-list.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {

  search = {"filter": 'Producto',
            "term": ''};
  categories = [];

  constructor(private router: Router, private db: MarketPlaceDBService, private categoryList: CategoryListService) { }

  ngOnInit(): void {
    if (!this.categoryList.getCategories().length) {
      this.setCategories();
    }
  }

  onSubmit() {
    //console.log("submit");
    //console.table(this.search);
    this.goToSearch()
  }

  getCategories() {
    this.categories = this.categoryList.getCategories();
  }

  setCategories() {
    this.db.findAllCategories().subscribe(
      (response) => {
        this.categories = [];
        if (response["categories"]) {
          response["categories"].forEach((item) =>{
            this.categories.push(item);
          });
          this.categoryList.setCategoriesFromArray(this.categories);
        }
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
    });
  }

  goToSearch() {
    if (this.search.term) {
      this.router.navigate(['/busqueda'], { queryParams: { filter: this.search.filter, term: this.search.term }, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate(['/busqueda'], { queryParams: { filter: this.search.filter}});
    }
  }
}
