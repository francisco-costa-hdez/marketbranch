import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-report-abug',
  templateUrl: './report-abug.component.html',
  styleUrls: ['./report-abug.component.css']
})
export class ReportABugComponent implements OnInit {

  bugForm:FormGroup;

  constructor(private db: MarketPlaceDBService,private form:FormBuilder) { 

    this.bugForm=this.form.group(
      {
        message:['',Validators.required],
        points:[''],
        email:['',Validators.compose([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.required])],
        
      }
    )
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

}
