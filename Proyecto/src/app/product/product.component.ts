import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product;
  loading = true;
  show:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProduct(id);
  }

  chosePrincipal() {
    alert("esto quiero hacerlo con los datos devueltos de la api pa no trabajar doble:)");
  }

  toggleGallery(state:boolean) {
    this.show = state;
  }

  getProduct(id: string | number) {
    this.db.getProduct(id).subscribe(
      (response) => {
        console.table(response);
        this.product = response[0];
          this.loading = false;
        console.log(this.product)
      },
      (error) =>  {});
    // this.movie = this.datos.getThisPelicula(id);
    // console.table(this.movie);
    }
}
