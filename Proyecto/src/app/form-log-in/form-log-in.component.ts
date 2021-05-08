import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { LocalStorageService } from '../local-storage.service';
import { LoginUser } from '../login-user';
import { Session } from '../session';

@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.css']
})
export class FormLogInComponent implements OnInit {

 loginForm:FormGroup;
 user = new LoginUser;

  constructor(private form:FormBuilder,
              private db:MarketPlaceDBService,
              private storageService: LocalStorageService,
              private router: Router) {
    this.loginForm=this.form.group(
      {
        email:['',Validators.required],
        password:['',Validators.compose([Validators.minLength(8),Validators.maxLength(16),Validators.required])]
      }
    );
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
      console.log(this.user);
      this.db.LogInClientUser(this.user).subscribe(
        (response) => {
          if (response["message"]=="credenciales no válidas") {
            console.log("ta mal")
          } else {
            console.log(response);
            let data = new Session;
            data.email = response["user"];
            data.token = response["token"];
            console.log(data);
            this.storageService.setCurrentSession(data);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.log("Se ha producido un error:")
          console.log(error)
        }); 
    }
  }
}
