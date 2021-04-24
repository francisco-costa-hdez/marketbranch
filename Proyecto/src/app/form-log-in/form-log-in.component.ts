import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.css']
})
export class FormLogInComponent implements OnInit {

 loginForm:FormGroup

  constructor(private form:FormBuilder) {
    console.log("constructor start")
    this.loginForm=this.form.group(
      {
      name:['',Validators.required],
      password:['',Validators.compose([Validators.minLength(8),Validators.maxLength(16),Validators.required])]
    }
    )
    console.log("constructor end")
   }

  ngOnInit(): void {
    console.log("constructor init start");
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
    
    console.log("constructor init end")
  }

}
