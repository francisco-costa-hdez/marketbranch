import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
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

  options = [];

  loading: boolean = false;

  constructor(private router: Router, private db: MarketPlaceDBService, private categoryList: CategoryListService) { }

  ngOnInit(): void {
    if (!this.categoryList.getCategories().length) {
      this.setCategories();
    } else {
      this.getCategories();
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
      }
    );
  }

  goToSearch() {
    if (this.search.term) {
      this.router.navigate(['/busqueda'], { queryParams: { filter: this.search.filter, term: this.search.term }, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate(['/busqueda'], { queryParams: { filter: this.search.filter}});
    }
  }

  select(option: string) {
    this.search.term = option;
    this.onSubmit();
  }

  updateDropdown() {
    if (this.search.term != "" && !this.loading) {
      this.options = []
      this.loading = true;
      if (this.search.filter == "Producto") {
        this.db.getDropdownProducts(this.search.term).subscribe(
          (response) => {
            if (response) {
              let responses = [];
              for (let i = 0; response[i]; i++) {
                responses.push(response[i].name)
              }
              this.options = [...responses];
              this.loading = false;
            }
          },
          (error) => {
            this.loading = false;
        });
      } else if (this.search.filter == "Tienda") {
        this.db.getDropdownShops(this.search.term).subscribe(
          (response) => {
            if (response) {
              let responses = [];
              for (let i = 0; response[i]; i++) {
                responses.push(response[i].name)
              }
              this.options = [...responses];
              this.loading = false;
            }
          },
          (error) => {
            this.loading = false;
        });
      } else if (this.search.filter != undefined) {
        
        this.db.getDropdownCategories(this.search.term, this.categoryList.getCategoryId(this.search.filter)).subscribe(
          (response) => {
            if (response) {
              let responses = [];
              for (let i = 0; response[i]; i++) {
                responses.push(response[i].name)
              }
              this.options = [...responses];
              this.loading = false;
            }
          },
          (error) => {            
            this.loading = false;
        });
      }
    } else if (this.search.term == "" && !this.loading) {
      this.options = []
    }
  }

}
