import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';
import { ShopUser } from '../shop-user';
import { Shop } from '../shop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.css']
})
export class ShopManagementComponent implements OnInit {

  products: Array<any>;
  totalProducts: Array<any>;
  sum = 5;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  editDetails: boolean = false;
  editDetailsShop: boolean = false;
  detailsForm: FormGroup;
  detailsFormShop: FormGroup;
  user: ShopUser;
  shop: Shop;

  passForm: FormGroup;

  constructor(private auth: AuthService, private db: MarketPlaceDBService, private form: FormBuilder) {
    this.passForm = new FormGroup({
      oldPass: new FormControl({value: "", disabled: false}, Validators.required),
      newPass1: new FormControl({value: "", disabled: false}, Validators.required),
      newPass2: new FormControl({value: "", disabled: false}, Validators.required),
    });

    this.detailsForm = new FormGroup({
      admin_name: new FormControl({value: "", disabled: true}, Validators.required),
      nif: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])),
    });

    this.detailsFormShop = new FormGroup({
      name: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])),
      address: new FormControl({value:"", disabled: true}, Validators.required),
      description: new FormControl({value:"", disabled: true}, Validators.required),
      tlf: new FormControl({value:"", disabled: true}, Validators.required)
    });

    this.db.findShopUserById(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response) {
          if (response["user"]) {
            this.user = response["user"][0];
            this.admin_name.setValue(this.user.admin_name);
            this.nif.setValue(this.user.nif);
            this.email.setValue(this.user.email);
          }
        };
      }, (error) =>  {}
    );

    this.db.findShopById(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response) {
          if (response["shop"]) {
            this.shop = response["shop"];
            this.name.setValue(this.shop.name);
            this.emailShop.setValue(this.shop.email);
            this.address.setValue(this.shop.address);
            this.description.setValue(this.shop.description);
            this.tlf.setValue(this.shop.tlf);
            // console.log(this.shop)
          }
          // console.log(response)
        };
      }, (error) =>  {}
    );


   }

   get admin_name() { return this.detailsForm.get('admin_name'); }
  get nif() { return this.detailsForm.get('nif'); }
  get email() { return this.detailsForm.get('email'); }


  get name() { return this.detailsFormShop.get('name'); }
  get tlf() { return this.detailsFormShop.get('tlf'); }
  get emailShop() { return this.detailsFormShop.get('email'); }
  get description() { return this.detailsFormShop.get('description'); }
  get address() { return this.detailsFormShop.get('address'); }

  ngOnInit(): void {
    this.products = [];
    this.totalProducts = [];
    if (this.auth.isAuthenticatedShop()) {
      this.db.findProductByShop(this.auth.getCurrentUserShop()).subscribe(
        (response) => {
          if (response["products"]) {
            response["products"].forEach((item) => {
              this.totalProducts.push(item);
            });
            this.initResults(this.totalProducts);
          }
        },
        (error) => {
          console.error('Request failed with error');
          console.error(error);
        });
    }

    (function() {
      'use strict';
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
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

  get oldPass() { return this.passForm.get('oldPass'); }
  get newPass1() { return this.passForm.get('newPass1'); }
  get newPass2() { return this.passForm.get('newPass2'); }

  initResults(array: Array<object>) {
    this.products = [];
    // console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.products.push(array[i]);
    }
    // console.table(this.results);
    // this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max)
    // this.initResults(this.totalResults)
  }

  appendItems(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalProducts[i] != null; ++i) {
      this.products.push(this.totalProducts[i]);
    }
  }

  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 6;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  logout() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }

  edit() {
    if(this.user){
    this.editDetails = (this.editDetails) ? false : true;
    (this.editDetails) ? this.detailsForm.enable() : this.detailsForm.disable();
    this.admin_name.setValue(this.user.admin_name);
    this.nif.setValue(this.user.nif);
    this.email.setValue(this.user.email);
    }
  }

  editShop() {
    if(this.shop){
    this.editDetailsShop = (this.editDetailsShop) ? false : true;
    (this.editDetailsShop) ? this.detailsFormShop.enable() : this.detailsFormShop.disable();
    this.name.setValue(this.shop.name);
    this.tlf.setValue(this.shop.tlf);
    this.emailShop.setValue(this.shop.email);
    this.address.setValue(this.shop.address);
    this.description.setValue(this.shop.description);
    }
  }

  onSubmitShop() {
    if(this.detailsFormShop.valid){
    let shop_new: Shop = Object.assign({},this.shop);
    shop_new.tlf=this.tlf.value
    shop_new.email=this.emailShop.value
    shop_new.address=this.address.value
    shop_new.description=this.description.value
    shop_new.name=this.name.value
    
    this.db.updateShop(shop_new).subscribe(
      (response)=>{
        console.log(response)
        this.shop.tlf = shop_new.tlf
        this.shop.email = shop_new.email
        this.shop.address = shop_new.address
        this.shop.description = shop_new.description
        this.shop.name = shop_new.name

        this.editShop()
      }
    )
    }
  }

  onSubmit() {
    if(this.detailsForm.valid){
    let shopUser: ShopUser = Object.assign({},this.user);
    shopUser.admin_name=this.admin_name.value
    shopUser.nif=this.nif.value
    shopUser.email=this.email.value
    // console.log(shopUser)
    this.db.updateShoptUser(shopUser).subscribe(
      (response)=>{
        console.log(response)
        this.user.admin_name=shopUser.admin_name
        this.user.nif=shopUser.nif
        this.user.email=shopUser.email
        this.edit();

      }
    )
  }
  }

  onSubmitPass() {
    
  }

}
