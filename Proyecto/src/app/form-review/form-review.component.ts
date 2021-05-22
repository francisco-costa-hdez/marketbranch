import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit {

  @Input() product_id;
  @Output() newReview = new EventEmitter();

  reviewForm:FormGroup;
  review = {rating:"", comment:"", client_user_id: "", product_id: ""};

  constructor(private db: MarketPlaceDBService,private form:FormBuilder, private auth: AuthService) { 
    this.reviewForm=this.form.group(
      {
        rating:['',Validators.required],
        comment:['',Validators.required]
      }
    )
  }
  
  get rating() { return this.reviewForm.get('rating'); }
  get comment() { return this.reviewForm.get('comment'); }
  
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
    if (this.auth.isAuthenticated()) {
      if(this.reviewForm.valid) {
        this.review.rating = this.rating.value;
        this.review.comment = this.comment.value;
        this.review.client_user_id = this.auth.getCurrentUserId().toString();
        this.review.product_id = this.product_id;
        if (this.review.rating && this.review.comment && this.review.client_user_id && this.review.product_id) {
          console.log("submitting")
          this.db.createReview(this.review).subscribe(
            (response) => {
              console.log(response);
              this.rating.setValue("");
              this.comment.setValue("");
              console.log("podrías devolver la review en la response??");
              this.newReview.emit(
                {
                  rating: this.review.rating,
                  comment: this.review.comment,
                  user_name: this.auth.getCurrentUserName(),
                  client_user_id: this.review.client_user_id,
                  product_id: this.review.product_id
                }
              );
            }
          );
        }
      }
    } else {
      alert("Para hacer una valoración primero debes iniciar sesión");
    }
  }

}