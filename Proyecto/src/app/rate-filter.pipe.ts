import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateFilter'
})
export class RateFilterPipe implements PipeTransform {

  transform(array: any[], minRate: number, maxRate: number): any[] {
    if (array && array.length && minRate >= 0 && maxRate >= 0) {
      return array.filter(product => (product.media_rating >= minRate && product.media_rating <= maxRate));
    }
    return array;
  }


}
