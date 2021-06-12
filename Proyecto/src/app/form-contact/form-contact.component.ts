import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {

  contactForm:FormGroup;
  messageOk: boolean;
  messageError: boolean;
  emailError: boolean;

  constructor(private db: MarketPlaceDBService,private form:FormBuilder) {
    this.messageOk = false;
    this.messageError = false;
    this.emailError = false;
    this.contactForm=this.form.group(
      {
        email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
        message:[''],
      }
    )
  }

  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  ngOnInit(): void {
    // (function() {
    //   'use strict';
    //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //     var forms = document.getElementsByClassName('needs-validation');
    //     // Loop over them and prevent submission
    //     var validation = Array.prototype.filter.call(forms, function(form) {
    //       form.addEventListener('submit', function(event) {
    //         if (form.checkValidity() === false) {
    //           event.preventDefault();
    //           event.stopPropagation();
    //         }
    //         form.classList.add('was-validated');
    //       }, false);
    //     });
    // })();
  }

  onSubmit() {
    this.messageOk = false;
    this.messageError = false;
    this.emailError = false;
    
    if(this.contactForm.valid){
      let mail = {email: this.email.value, message: this.message.value}
      
      this.db.sendMessage(mail).subscribe(
        (response) => {
          if(response["message"] ="Mensaje enviado correctamente"){
            this.messageOk = true;
            this.message.setValue("");
            // this.email.setValue("");
          } else {
            this.messageError = true;
          }
        },
        (error) => {
          this.messageError = true;
        }
      ); 
    } else {
      this.emailError = true;
    }
  }
}
