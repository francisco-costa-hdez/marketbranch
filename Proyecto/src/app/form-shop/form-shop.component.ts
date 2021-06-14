import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { ShopUser } from '../shop-user';
import { validarIguales } from '../app.validator';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-form-shop',
  templateUrl: './form-shop.component.html',
  styleUrls: ['./form-shop.component.css']
})
export class FormShopComponent implements OnInit {
  shopUserForm:FormGroup;
  emailExists=false
  errorEmail=""
  nifExists=false
  errorNif=""
  imgExists=false
  errorImg=""
  shopUserFormValid=false
  shopUser = new ShopUser;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  compressedImage: any = '';

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder, private compressor: NgxImageCompressService) {
    this.shopUserForm=this.form.group(
      {
      admin_name:['',Validators.required],
      nif:['',Validators.required],
      email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
      profile_img:['',Validators.required],
      password:['',Validators.compose([Validators.minLength(8),Validators.maxLength(16),Validators.required])],
      password2:['',Validators.required],
      check1:[false,Validators.required]
    }
    , {
      validators: validarIguales
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

   get admin_name() { return this.shopUserForm.get('admin_name'); }
   get email() { return this.shopUserForm.get('email'); }
   get nif() { return this.shopUserForm.get('nif'); }
   get img() { return this.shopUserForm.get('profile_img'); }
   get password() { return this.shopUserForm.get('password'); }
   get password2() { return this.shopUserForm.get('password2'); }

  ngOnInit(): void {
    (function() {
      'use strict';
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // var pass1 = document.getElementById('password');
        // var pass2 = document.getElementById('password2');
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


  onSubmit() {
    this.emailExists=false;
    this.nifExists=false;
    this.imgExists=false;
   
    
    if(this.shopUserForm.valid){
      this.shopUser.admin_name=this.admin_name.value;
      this.shopUser.email=this.email.value;
      this.shopUser.nif=this.nif.value;
      this.shopUser.password=this.password.value;
      // this.shopUser.profile_img=this.img.value;
      this.shopUser.profile_img=(this.compressedImage) ? this.compressedImage : this.croppedImage;
      // console.log(this.croppedImage);
      
      
      // console.log(this.client)
      // let arrayClient = {"name": this.client.name, "email": this.client.email, "tlf": this.client.tlf, "profile_img": this.client.profile_img, "address": this.client.address, "password": this.client.password}
      // console.log(arrayClient)
      // let jsonClient = JSON.stringify(this.client)
      // console.log(jsonClient)
      // let jsonArrayClient = JSON.stringify(arrayClient)
      // console.log(jsonArrayClient)
      this.db.createShopUser(this.shopUser).subscribe(
        (response) => {
          // console.log(response)
          if(response["email"]){
          this.emailExists=true
          response["email"].forEach((item) =>{
            this.errorEmail=item
          });
        }
        if(response["nif"]){
          this.nifExists=true
          response["nif"].forEach((item) =>{
            this.errorNif=item
          });
        }
        if(response["profile_img"]){
          this.imgExists=true
          response["profile_img"].forEach((item) =>{
            this.errorImg=item
          });
        }
        if(!(response["nif"] || response["email"] || response["profile_img"])){
          // console.log("todo ha ido bien")
          this.shopUserFormValid=true
          // this.router.navigate(['/validshopuser']);
        }

        },
        (error) => {
          console.log("Se ha producido un error:")
          console.log(error)
          
          
        }); 
      }
    
   
  }

}
