import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { Product } from '../product';
import { CategoryListService } from '../category-list.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  categories = [];
  subCategories = [];
  subCategories2;

  productForm:FormGroup;
  product = new Product;

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder,private categoryList: CategoryListService) {
    this.productForm=this.form.group(
      {
      name:['',Validators.required],
      price:['',Validators.required],
      discount:[''],
      stock:['',Validators.required],
      availability:['',Validators.required],
      description:['',Validators.required],
      // image:['',Validators.required]
    }
    )
   }

   get name() { return this.productForm.get('name'); }
   get price() { return this.productForm.get('price'); }
   get discount() { return this.productForm.get('discount'); }
   get stock() { return this.productForm.get('stock'); }
   get availability() { return this.productForm.get('availability'); }
   get description() { return this.productForm.get('description'); }


  ngOnInit(): void {
    for(let i=1;i<=13;i++){
      this.getSubca(i)
    }
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
  }


  getCategories() {
    this.categories = this.categoryList.getCategories();
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
  this.subCategories.push(response["subcategories"]);
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
       this.product.name=this.name.value
       this.product.price=this.price.value
       this.product.discount=this.discount.value
       this.product.description=this.description.value
       this.product.stock=this.stock.value
       this.product.availability=this.availability.value
      
      this.db.createProduct(this.product).subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log("Se ha producido un error:")
          console.log(error)
          
          
        }); 
      }
    
   
  }

}
