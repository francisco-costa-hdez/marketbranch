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

  constructor(private auth: AuthService, private db: MarketPlaceDBService, private form: FormBuilder) {
    this.detailsForm = new FormGroup({
      admin_name: new FormControl({value: "", disabled: true}, Validators.required),
      nif: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.required),
      // address: new FormControl({value:"", disabled: true}, Validators.required)
    });

    this.detailsFormShop = new FormGroup({
      name: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.required),
      address: new FormControl({value:"", disabled: true}, Validators.required),
      description: new FormControl({value:"", disabled: true}, Validators.required),
      tlf: new FormControl({value:"", disabled: true}, Validators.required)
    });

    this.db.findShopUserById(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response) {
          if (response["user"]) {
            this.user = response["user"][0];
            console.log(this.user)
            this.admin_name.setValue(this.user.admin_name);
            this.nif.setValue(this.user.nif);
            this.email.setValue(this.user.email);
          }
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
  }

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
    console.log("helow")
    // let editedUser:ClientUser=new ClientUser
    let Shop_new: Shop = Object.assign({},this.shop);
    Shop_new.tlf=this.tlf.value
    Shop_new.email=this.emailShop.value
    Shop_new.address=this.address.value
    Shop_new.description=this.description.value
    Shop_new.name=this.name.value
    
    console.log(Shop)
    this.db.updateShop(Shop).subscribe(
      (response)=>{
        console.log(response)
        // this.user.name=this.name.value
        // console.log(this.user.name)
        // console.log(this.name.value)
        // this.user.address=this.address.value
        // this.user.email=this.email.value
        // this.user.tlf=this.tlf.value

      }
    )
  }

  onSubmit() {
    console.log("helow")
    // let editedUser:ClientUser=new ClientUser
    let ShopUser: ShopUser = Object.assign({},this.user);
    ShopUser.admin_name=this.admin_name.value
    ShopUser.nif=this.nif.value
    ShopUser.email=this.email.value
    // this.user.password=this.user.password
    // this.user.profile_img=this.user.profile_img
    console.log(ShopUser)
    this.db.updateShoptUser(ShopUser).subscribe(
      (response)=>{
        console.log(response)
        // this.user.name=this.name.value
        // console.log(this.user.name)
        // console.log(this.name.value)
        // this.user.address=this.address.value
        // this.user.email=this.email.value
        // this.user.tlf=this.tlf.value

      }
    )
  }

}
