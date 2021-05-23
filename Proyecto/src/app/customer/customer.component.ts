import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validarIguales } from '../app.validator';
import { AuthService } from '../auth.service';
import { ClientUser } from '../client-user';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editDetails: boolean = false;
  detailsForm: FormGroup;
  user: ClientUser;
  // editedUser:ClientUser;

  constructor(private form: FormBuilder, private auth: AuthService, private db: MarketPlaceDBService) {
    // this.detailsForm = this.form.group(
    //   {
    //     name:['',Validators.required],
    //     tlf:['',Validators.compose([Validators.minLength(9),Validators.required])],
    //     email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
    //     address:['',Validators.required]
    //   }
    //   , {
    //     validators: validarIguales
    //   }
    // )
    this.detailsForm = new FormGroup({
      name: new FormControl({value: "", disabled: true}, Validators.required),
      tlf: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.required),
      address: new FormControl({value:"", disabled: true}, Validators.required)
    });
    this.db.findClientUserById(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response) {
          (response["user"]) ? this.user = response["user"] : console.log("Ha ocurrido un problema");
          this.name.setValue(this.user.name);
          this.tlf.setValue(this.user.tlf);
          this.email.setValue(this.user.email);
          this.address.setValue(this.user.address);
        };
      }, (error) =>  {}
    );
  }

  ngOnInit(): void {

  }

  get name() { return this.detailsForm.get('name'); }
  get tlf() { return this.detailsForm.get('tlf'); }
  get email() { return this.detailsForm.get('email'); }
  get address() { return this.detailsForm.get('address'); }

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

  onSubmit() {
    console.log("helow")
    // let editedUser:ClientUser=new ClientUser
    let client: ClientUser = Object.assign({},this.user);
    client.name=this.name.value
    client.address=this.address.value
    client.email=this.email.value
    client.tlf=this.tlf.value
    // this.user.password=this.user.password
    // this.user.profile_img=this.user.profile_img
    console.log(client)
    this.db.updateClientUser(client).subscribe(
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


// $2y$10$xJIJYlhDqcYPkGCLa6szdeh5mB83ZJjZOR9IEu3tb2iDLVPgatLXm