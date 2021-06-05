import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-form-update-password',
  templateUrl: './form-update-password.component.html',
  styleUrls: ['./form-update-password.component.css']
})
export class FormUpdatePasswordComponent implements OnInit {

  @Input() admin: boolean;
  passForm: FormGroup;

  passNotChanged: boolean = false;
  passChanged: boolean = false;

  constructor(private form: FormBuilder, private db: MarketPlaceDBService) {
    this.passForm = new FormGroup({
      oldPass: new FormControl({value: "", disabled: false}, Validators.required),
      newPass1: new FormControl({value: "", disabled: false}, Validators.required),
      newPass2: new FormControl({value: "", disabled: false}, Validators.required),
    });
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

  onSubmitPass() {
    let pass = {password: "", new_password: ""};
    if (this.passForm.valid) {
      this.passNotChanged = false;
      this.passChanged = false;

      pass.password = this.oldPass.value;
      pass.new_password = this.newPass1.value;
      console.log(pass);
      (this.admin) ? this.updateShopUserPassword(pass) : this.updateClientUserPassword(pass);
    }   
  }

  updateClientUserPassword(pass) {
    this.db.updateClientUserPassword(pass).subscribe(
      (response)=>{
        if (response["message"]=="La contraseña se ha actualizado correctamente") {
          this.passChanged = true;
        } else {
          this.passNotChanged = true;
        }
      }
      ,
      (error) => {
        this.passNotChanged = true;
      }
    )
  }

  updateShopUserPassword(pass) {
    this.db.updateShopUserPassword(pass).subscribe(
      (response)=>{
        console.log(response)
        if (response["message"] == "La contraseña se ha actualizado correctamente") {
          this.passChanged = true;
        } else {
          this.passNotChanged = true;
        }
      },
      (error) => {
        this.passNotChanged = true;
      }
    )
  }

}
