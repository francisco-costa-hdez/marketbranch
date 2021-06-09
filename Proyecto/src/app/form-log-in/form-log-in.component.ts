import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { AuthService } from '../auth.service';
import { Cookie } from '../cookie';
import { LoginUser } from '../login-user';
import { ProfileImageService } from '../profile-image.service';

@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.css']
})
export class FormLogInComponent implements OnInit {

  client: boolean =  true;
  loginForm: FormGroup;
  user = new LoginUser;
  validationNeeded: boolean = false;
  inputError: boolean = false;
 

  constructor(private form:FormBuilder, private db:MarketPlaceDBService, private auth: AuthService, private router: Router, private img: ProfileImageService) {
    this.loginForm=this.form.group(
      {
        email:['',Validators.required],
        password:['',Validators.compose([Validators.minLength(8),Validators.maxLength(16),Validators.required])]
      }
    );
    this.validationNeeded = false;
    this.inputError = false;
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

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
    if(this.loginForm.valid){
      this.user.email= this.email.value;
      this.user.password= this.password.value;
      // console.log(this.user);
      this.validationNeeded = false;
      this.inputError = false;
      (this.client) ? this.loginAsClient() : this.loginAsShop();
    }
  }

  loginAsClient() {
    
    this.db.LogInClientUser(this.user).subscribe(
      (response) => {
        if (response["message"] == "Verifica tu cuenta de correo electrónico para iniciar sesión"){
          this.validationNeeded = true;
        }
        else if (response["message"] == "credenciales no válidas") {
          this.inputError = true
        } else {
          let data = new Cookie;
          data.name = response["user"];
          data.id = response["user_id"];
          data.token = response["token"];
          data.token = response["token"];
          this.auth.setCurrentUser(data);
          this.img.setImage(response["profile_img"]);
          // console.log(this.auth.getCurrentUser());
          this.router.navigate(['/home']);
        }
        // this.auth.deleteCurrentUser();
      },
      (error) => {
        // console.log("Se ha producido un error:")
        // console.log(error)
      }
    ); 
  }

  loginAsShop() {
    this.db.LogInShopUser(this.user).subscribe(
      (response) => {
        if (response["message"] == "credenciales no válidas") {
          this.inputError = true;
        } else {
          // this.auth.deleteCurrentUser();
          let data = new Cookie;
          data.name = response["user"].admin_name;
          data.id = response["user"].id;
          data.token = response["token"];
          data.shop = response["shop_id"];
          this.auth.setCurrentUser(data);
          this.img.setImage(response["profile_img"]);
          // console.log(this.auth.getCurrentUser());
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        // console.log("Se ha producido un error:")
        // console.log(error)
      }
    ); 
  }

  setClient() {
    if (!this.client) {
      this.client = true;
    }
    this.validationNeeded = false;
      this.inputError = false;
  }

  setShop() {
    if (this.client) {
      this.client = false;
    }
    this.validationNeeded = false;
      this.inputError = false;
  }

}
