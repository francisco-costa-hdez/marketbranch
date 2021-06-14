import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../auth.service';
import { ClientUser } from '../client-user';
import { MarketPlaceDBService } from '../market-place-db.service';
import { ProfileImageService } from '../profile-image.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editDetails: boolean = false;
  detailsForm: FormGroup;
  user: ClientUser;

  dataNotChanged: boolean = false;
  dataChanged: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  compressedImage: any = '';

  constructor(private form: FormBuilder, private auth: AuthService, private db: MarketPlaceDBService,
     private img: ProfileImageService,private compressor: NgxImageCompressService) {
    this.detailsForm = new FormGroup({
      name: new FormControl({value: "", disabled: true}, Validators.required),
      tlf: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.required),
      address: new FormControl({value:"", disabled: true}, Validators.required),
      image: new FormControl({value: "", disabled: true})

    });
    this.db.findClientUserById(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response) {
          if (response["user"]) {
            this.user = response["user"];
            this.name.setValue(this.user.name);
            this.tlf.setValue(this.user.tlf);
            this.email.setValue(this.user.email);
            this.address.setValue(this.user.address);
          }
        };
      }, (error) =>  {}
    );
  }

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

  get name() { return this.detailsForm.get('name'); }
  get tlf() { return this.detailsForm.get('tlf'); }
  get email() { return this.detailsForm.get('email'); }
  get address() { return this.detailsForm.get('address'); }
  get image() { return this.detailsForm.get('image'); }

  edit() {
    if(this.user){
      this.editDetails = (this.editDetails) ? false : true;
      (this.editDetails) ? this.detailsForm.enable() : this.detailsForm.disable();
      this.name.setValue(this.user.name);
      this.tlf.setValue(this.user.tlf);
      this.email.setValue(this.user.email);
      this.address.setValue(this.user.address);
    }
  }

  onSubmitUserData() {
    if (this.detailsForm.valid) {
      this.dataNotChanged = false;
      this.dataChanged = false;
      
      let client: ClientUser = Object.assign({},this.user);
      client.name=this.name.value;
      client.address=this.address.value;
      client.email=this.email.value;
      client.tlf=this.tlf.value;
      let image = (this.croppedImage) ? this.croppedImage : this.user.profile_img;
      if (this.croppedImage) {
        client.profile_img = (this.compressedImage) ? this.compressedImage : this.croppedImage;
      } else {
        client.profile_img = this.user.profile_img
      }
      // client.profile_img=image;
      // console.log(client)
      this.db.updateClientUser(client).subscribe(
        (response)=>{
          if (response["message"]=="Los datos se han actualizado correctamente") {
            this.user.name = client.name;
            this.user.address = client.address;
            this.user.email = client.email;
            this.user.tlf = client.tlf;
            this.user.profile_img = image;

            this.img.setImage(image);

            this.dataChanged = true;
          } else {
            this.dataNotChanged = true;
          }
          this.edit();
        },
        (error) => {
          this.dataNotChanged = true;
        }
      )
    }
  }
  
  logout() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }

}
