import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { ClientUser } from '../client-user';
import { validarIguales } from '../app.validator';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm:FormGroup;
  emailExists=false
  errorEmail=""
  tlfExists=false
  errorTlf=""
  userFormValid=false
  client = new ClientUser;

  constructor(private db: MarketPlaceDBService,private router: Router,private form:FormBuilder) { 
    this.userForm=this.form.group(
      {
        name:['',Validators.required],
        address:['',Validators.required],
        tlf:['',Validators.compose([Validators.minLength(9),Validators.required])],
        email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
        profile_img:[''],
        password:['',Validators.compose([Validators.minLength(8),Validators.maxLength(16),Validators.required])],
        password2:['',Validators.required],
        check1:[false,Validators.required]
      }
      , {
        validators: validarIguales
      }
    )
  }
  
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get address() { return this.userForm.get('address'); }
  get tlf() { return this.userForm.get('tlf'); }
  get img() { return this.userForm.get('profile_img'); }
  get password() { return this.userForm.get('password'); }
  get password2() { return this.userForm.get('password2'); }
  
  ngOnInit(): void {
    this.userFormValid = false;
    this.emailExists = false;
    this.tlfExists = false;
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
    this.emailExists=false
    this.tlfExists=false
    this.userFormValid==false
    
    if(this.userForm.valid){
      this.client.name=this.name.value
      this.client.email=this.email.value
      this.client.tlf=this.tlf.value
      this.client.password=this.password.value
      this.client.address=this.address.value
      this.client.profile_img=this.img.value
      
      
      // console.log(this.client)
      // let arrayClient = {"name": this.client.name, "email": this.client.email, "tlf": this.client.tlf, "profile_img": this.client.profile_img, "address": this.client.address, "password": this.client.password}
      // console.log(arrayClient)
      // let jsonClient = JSON.stringify(this.client)
      // console.log(jsonClient)
      // let jsonArrayClient = JSON.stringify(arrayClient)
      // console.log(jsonArrayClient)
      this.db.createClientUser(this.client).subscribe(
        (response) => {
          console.log(response)

          if(response["email"]){
          // console.log(this.userFormValid)
          this.emailExists=true
          response["email"].forEach((item) =>{
            this.errorEmail=item
          });
        }
        if(response["tlf"]){
          this.tlfExists=true
          // console.log(this.userFormValid)
          response["tlf"].forEach((item) =>{
            this.errorTlf=item
          });
        }
        if(!(response["email"] || response["tlf"])){
          // console.log("todo ha ido bien")
          this.userFormValid=true
          // console.log(this.userForm)
          this.router.navigate(['/validshopuser']);
          
        }
        },
        (error) => {
          console.log("Se ha producido un error:")
          console.log(error)
          
        }); 
      }
    }

  

}