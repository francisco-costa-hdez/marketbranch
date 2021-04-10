import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css']
})
export class SearchSidebarComponent implements AfterViewInit {

  @Input() type: string;

  @Output() priceChangeEvent = new EventEmitter();
  @Output() rateChangeEvent = new EventEmitter();

  @ViewChild('minPricing') minPricing: ElementRef<HTMLInputElement>;
  @ViewChild('maxPricing') maxPricing: ElementRef<HTMLInputElement>;

  @ViewChild('maxRating') minRating: ElementRef<HTMLInputElement>;
  @ViewChild('maxRating') maxRating: ElementRef<HTMLInputElement>;

  price = {min: 0,
           max: 10000};

  rate = {min: 0,
           max: 5};
  
  
  sliderOptions: Options = {
    floor: 0,
    ceil: 10000
  };

  constructor() { };

  ngAfterViewInit(): void {
    this.updatePrice(this.minPricing.nativeElement, this.maxPricing.nativeElement);
    this.updateRate(this.minRating.nativeElement, this.maxRating.nativeElement);
    this.priceChange();
    this.rateChange();
  }

  priceChange() {
    this.priceChangeEvent.emit(this.price);
  }
  
  rateChange() {
    this.rateChangeEvent.emit(this.rate);
  }

  updatePrice(minInput, maxInput) {
    minInput.value = this.price.min;
    maxInput.value = this.price.max;
    this.priceChange()
  }
  
  updateRate(minInput, maxInput) {
    minInput.value = this.rate.min;
    maxInput.value = this.rate.max;
    this.rateChange()
  }
  
  updateMinPrice(newValue) {
    this.price.min = newValue;
    this.priceChange()
  }
  
  updateMinRate(newValue) {
    this.rate.min = newValue;
    this.rateChange()
  }
  
  updateMaxPrice(newValue) {
    this.price.max = newValue;
    this.priceChange()
  }
  
  updateMaxRate(newValue) {
    this.rate.max = newValue;
    this.rateChange()
  }

}
