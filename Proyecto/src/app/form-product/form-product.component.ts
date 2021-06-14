import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { Product } from '../product';
import { Image } from '../image';
import { CategoryListService } from '../category-list.service';
import { AuthService } from '../auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  categories = [];
  subCategories = [];

  productForm:FormGroup;
  product = new Product;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  compressedImage: any = '';
  imageProduct = new Image;

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder,
    private categoryList: CategoryListService, private auth: AuthService, private compressor: NgxImageCompressService) {
    this.productForm=this.form.group(
      {
      name:['',Validators.required],
      price:['',Validators.required],
      discount:[''],
      stock:['',Validators.required],
      availability:['',Validators.required],
      description:['',Validators.required],
      subcategory_id:['',Validators.required],
      image:['',Validators.required]
    }
    )
   }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.compressor.getOrientation(this.croppedImage).then(
      result => {
        this.compressor.compressFile(this.croppedImage, result, 50, 50).then(
          result2 => {
            this.compressedImage= result2;
          }
        );
      }
    );
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get discount() { return this.productForm.get('discount'); }
  get stock() { return this.productForm.get('stock'); }
  get availability() { return this.productForm.get('availability'); }
  get description() { return this.productForm.get('description'); }
  get subcategory_id() { return this.productForm.get('subcategory_id'); }
  get image() { return this.productForm.get('image'); }

  ngOnInit(): void {
    // for(let i=1;i<=13;i++){
    //   this.getSubca(i)
    // }
    if (!this.categoryList.getCategories().length) {
      this.setCategories();
    } else {
      this.getCategories();
    }

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
    // console.log(this.productForm.get('discount'))
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
      });
  }

getSubca(i){
  
  this.db.findSubcategoryByCategoryId(i).subscribe(
  (response) => {
  this.subCategories[i-1] = (response["subcategories"]);
  }     
  ,
   (error) => {
   console.error('Request failed with error');
   console.error(error);
   });
   return this.subCategories

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
       this.product.shop_id=Number(this.auth.getCurrentUserShop());
       this.imageProduct.image=(this.compressedImage) ? this.compressedImage : this.croppedImage;
      //  this.imageProduct.image=this.image.value;
      
      this.db.createProduct(this.product).subscribe(
        (response) => {
          // console.log(response);
          this.imageProduct.product_id=response["product"].id;
          this.db.uploadProductImage(this.imageProduct).subscribe(
            (response) => {
              // console.log(response);
              this.router.navigate(["/administrar-tienda"])
            },
            (error) => {
              console.log("Se ha producido un error:");
              console.log(error);
            }
          )
        },
        (error) => {
          console.log("Se ha producido un error:");
          console.log(error);
        }); 

      }
    
   
  }

}