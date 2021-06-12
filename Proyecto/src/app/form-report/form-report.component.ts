import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.css']
})

export class FormReportComponent implements OnInit {
  
  reportForm:FormGroup;
  messageOk: boolean;
  messageError: boolean;

  constructor(private db: MarketPlaceDBService,private form:FormBuilder) {
    this.messageOk = false;
    this.messageError = false;
    this.reportForm=this.form.group(
      {
        email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
        message:[''],
      }
    )
  }

  get email() { return this.reportForm.get('email'); }
  get message() { return this.reportForm.get('message'); }

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

  onSubmit() {
    this.messageOk = false;
    this.messageError = false;
    
    if(this.reportForm.valid){
      let mail = {email: this.email.value, message: this.message.value}
      
      this.db.reportError(mail).subscribe(
        (response) => {
          console.log(response)

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
    }
  }
}

