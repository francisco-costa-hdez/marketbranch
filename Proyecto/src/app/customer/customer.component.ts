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
  passForm: FormGroup;

  constructor(private form: FormBuilder, private auth: AuthService, private db: MarketPlaceDBService) {
    this.passForm = new FormGroup({
      oldPass: new FormControl({value: "", disabled: false}, Validators.required),
      newPass1: new FormControl({value: "", disabled: false}, Validators.required),
      newPass2: new FormControl({value: "", disabled: false}, Validators.required),
    });
    this.detailsForm = new FormGroup({
      name: new FormControl({value: "", disabled: true}, Validators.required),
      tlf: new FormControl({value: "", disabled: true}, Validators.required),
      email: new FormControl({value: "", disabled: true}, Validators.required),
      address: new FormControl({value:"", disabled: true}, Validators.required)
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
  get oldPass() { return this.passForm.get('oldPass'); }
  get newPass1() { return this.passForm.get('newPass1'); }
  get newPass2() { return this.passForm.get('newPass2'); }

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

  onSubmitPass() {
    
  }

  onSubmit() {
    let client: ClientUser = Object.assign({},this.user);
    if(this.detailsForm.valid){
    client.name=this.name.value
    client.address=this.address.value
    client.email=this.email.value
    client.tlf=this.tlf.value
    // this.user.password=this.user.password
    // this.user.profile_img=this.user.profile_img
    console.log(client)
    this.db.updateClientUser(client).subscribe(
      (response)=>{
        this.user.name = client.name
        this.user.address = client.address
        this.user.email = client.email
        this.user.tlf = client.tlf
        this.edit();

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
