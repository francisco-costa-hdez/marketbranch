import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(array: any[], minPrice: number, maxPrice: number): any[] {
    if (array && array.length && minPrice >= 0 && maxPrice >= 0  && minPrice < maxPrice) {
      return array.filter(product => (product.price >= minPrice && product.price <= maxPrice));
    }
    return array;
  }

}
