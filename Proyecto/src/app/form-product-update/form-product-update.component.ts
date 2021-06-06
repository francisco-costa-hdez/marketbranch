import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { Product } from '../product';
import { Image } from '../image';
import { CategoryListService } from '../category-list.service';
import { AuthService } from '../auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-form-product-update',
  templateUrl: './form-product-update.component.html',
  styleUrls: ['./form-product-update.component.css']
})
export class FormProductUpdateComponent implements OnInit {

  categories = [];
  subCategories = [];

  productForm:FormGroup;
  product = new Product;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  image = new Image;

  productOld;

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder,private categoryList: CategoryListService, private auth: AuthService,
    private route: ActivatedRoute) {
    this.productForm=this.form.group(
      {
        name:['',Validators.required],
        price:['',Validators.required],
        discount:[''],
        stock:['',Validators.required],
        availability:['',Validators.required],
        description:['',Validators.required],
        subcategory_id:['',Validators.required]
        // image:['',Validators.required]
      }
    )

    this.productForm.disable()
    
    if (!this.categoryList.getCategories().length) {
      this.setCategories();
    } else {
      this.getCategories();
    }

    this.getProduct(this.route.snapshot.paramMap.get('id'));
   }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get discount() { return this.productForm.get('discount'); }
  get stock() { return this.productForm.get('stock'); }
  get availability() { return this.productForm.get('availability'); }
  get description() { return this.productForm.get('description'); }
  get subcategory_id() { return this.productForm.get('subcategory_id'); }
  //  get image() { return this.productForm.get('image'); }

   ngOnInit(): void {

    (function() {
      'use strict';
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
            
          }, false);
        });
    })();
  }

  getProduct(id: string | number) {
    this.db.findProductById(id).subscribe(
      (response) => {
        if (response["product"]) {
          this.productOld = response["product"][0];
          if (this.productOld.shop_id == this.auth.getCurrentUserId()) {
            this.productForm.enable()
            this.name.setValue(this.productOld.name);
            this.price.setValue(this.productOld.price);
            this.discount.setValue(this.productOld.discount);
            this.description.setValue(this.productOld.description);
            this.stock.setValue(this.productOld.stock);
            this.availability.setValue(this.productOld.availability);
            this.subcategory_id.setValue(this.productOld.subcategory_id);
            // this.shop_id.setValue(this.auth.getCurrentUserShop());
            // this.imageProduct.image=this.image.value;
            // console.log(this.product);
          }
        }
      },
      (error) =>  {});
  }
 
  getCategories() {
    this.categories = this.categoryList.getCategories();
    this.categories.forEach((category) => {
      this.getSubca(category.id);  
    })
  }

  setCategories() {
    this.db.findAllCategories().subscribe(
      (response) => {
      if (response["categories"]) {
      response["categories"].forEach((item) =>{
      this.categories.push(item);
      // console.table(item)    
      });
      this.categoryList.setCategoriesFromArray(this.categories);
      this.categories.forEach((category) => {
        this.getSubca(category.id);  
      })
      }
      },
      (error) => {
      console.error('Request failed with error');
      console.error(error);
      }
    );
  }

  getSubca(i){
    
    this.db.findSubcategoryByCategoryId(i).subscribe(
    (response) => {
    this.subCategories.push(response["subcategories"]);
    }     
    ,
    (error) => {
    console.error('Request failed with error');
    console.error(error);
    });
    return this.subCategories;
  }

  redirect() {
    this.router.navigate(["/administrar-tienda"]);
  }

  delete() {
    this.db.deleteProduct(this.route.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        if (response["message"] = 'Producto eliminado') {
          this.redirect();
        }
        // this.imageProduct.product_id=response["product"].id
      },
      (error) => {
        console.log("Se ha producido un error:");
        console.log(error);
      }
    ); 
  }

  onSubmit() {
    if(this.productForm.valid){
      this.product.name=this.name.value;
      this.product.price=this.price.value;
      this.product.discount=this.discount.value;
      this.product.description=this.description.value;
      this.product.stock=this.stock.value;
      this.product.availability=this.availability.value;
      this.product.subcategory_id=this.subcategory_id.value;
      this.db.updateProduct(this.route.snapshot.paramMap.get('id'),this.product).subscribe(
        (response) => {
          console.log(response);
          // this.imageProduct.product_id=response["product"].id
          this.redirect();
        },
        (error) => {
          console.log("Se ha producido un error:");
          console.log(error);
        }
      ); 
    }
  }
}
