import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {

  search = {"filter": 'Producto',
            "term": ''};
  categories = [];

  constructor(private router: Router, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit() {
    console.log("submit");
    console.table(this.search);
    this.goToSearch()
  }

  getCategories() {
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

  goToSearch() {
    this.router.navigate(['/busqueda'], { queryParams: { filter: this.search.filter, term: this.search.term }, queryParamsHandling: 'merge' });
  }
}
