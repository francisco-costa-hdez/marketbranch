import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, SimpleChange, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Options} from '@angular-slider/ngx-slider';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css']
})
export class SearchSidebarComponent implements AfterViewInit {

  @Input() type: string;
  @Input() categoryId: number;

  @Output() priceChangeEvent = new EventEmitter();
  @Output() rateChangeEvent = new EventEmitter();
  @Output() subcategoryChangeEvent = new EventEmitter();

  @ViewChild('minPricing') minPricing: ElementRef<HTMLInputElement>;
  @ViewChild('maxPricing') maxPricing: ElementRef<HTMLInputElement>;

  @ViewChild('maxRating') minRating: ElementRef<HTMLInputElement>;
  @ViewChild('maxRating') maxRating: ElementRef<HTMLInputElement>;

  price = {min: 0,
           max: 10000};

  rate = {min: 0,
           max: 5};
  
  priceOptions: Options = {
    floor: 0,
    ceil: 10000
  };
  
  rateOptions: Options = {
    floor: 0,
    ceil: 5
  };
  all = false;

  subcategories = [];
  checked = [];
  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // console.log("end");
        this.rate.min = 0;
        this.rate.max = 5;

        this.price.min = 0;
        this.price.max = 10000;

        this.subcategories = [];
        this.all = true;
        this.updateAllChecked();
      }
    });
  }

  getSubcategories() {
    this.subcategories = [];
    this.db.findSubcategoryByCategoryId(this.categoryId).subscribe(
      (response) => {
        if (response["subcategories"]) {
          response["subcategories"].forEach((item) =>{
            this.subcategories.push(item);
            let checked = {
              Value: true,
              id: item.id
            }
            this.checked.push(checked);
          });
          this.all = true;
        } 
        // console.table(this.subcategories)
      },
      (error) => {
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    if ((this.minPricing && this.maxPricing)) {
      this.updatePrice(this.minPricing.nativeElement, this.maxPricing.nativeElement);
      this.priceChange();
    }
    if ((this.minRating && this.maxRating)) {
      this.updateRate(this.minRating.nativeElement, this.maxRating.nativeElement);
      this.rateChange();
    }
  }

  ngOnChanges(changes: { [categoryId: number]: SimpleChange}){
    if ( changes['categoryId'] && changes['categoryId'].currentValue > 0 ) {
      this.getSubcategories();
    }
 }

  priceChange() {
    this.priceChangeEvent.emit(this.price);
  }
  
  rateChange() {
    this.rateChangeEvent.emit(this.rate);
  }
  
  updateChecked() {
    this.all = !this.checked.some((item) => item.Value === false);
    this.subcategoryChangeEvent.emit(this.checked);
  }
  
  updateAllChecked() {
    this.checked.forEach(item => {
      item.Value = this.all;
    });
    this.subcategoryChangeEvent.emit(this.checked);
  }

  updatePrice(minInput, maxInput) {
    minInput.value = this.price.min;
    maxInput.value = this.price.max;
    this.priceChange();
  }

  updateRate(minInput, maxInput) {
    minInput.value = this.rate.min;
    maxInput.value = this.rate.max;
    this.rateChange();
  }
  
  // updateRate(minInput, maxInput) {
  //   minInput.value = Number(this.rate["min"]);
  //   maxInput.value = Number(this.rate["max"]);
  //   this.rateChange();
  // }
  
  updateMinPrice(newValue) {
    this.price.min = newValue;
    this.priceChange();
  }
  
  updateMinRate(newValue) {
    // if (this.rate.max <= newValue) {
    //   this.rate.min = this.rate.max;
    //   this.rate.max = newValue;
    // } else {
    //   this.rate.min = newValue;
    // }
    this.rate.min = newValue;
    this.rateChange();
  }
  
  updateMaxPrice(newValue) {
    this.price.max = newValue;
    this.priceChange();
  }
  
  updateMaxRate(newValue) {
    this.rate.max = newValue;
    this.rateChange();
  }

}
