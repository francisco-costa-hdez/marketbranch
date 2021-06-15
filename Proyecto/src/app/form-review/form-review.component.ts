import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';
import { ProfileImageService } from '../profile-image.service';

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

  constructor(private db: MarketPlaceDBService,private form:FormBuilder, private auth: AuthService, private image: ProfileImageService) { 
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
              if (response["review"]) {
                console.log(response["review"]);
                this.rating.setValue("");
                this.comment.setValue("");
                this.newReview.emit(
                  {
                    rating: response["review"].rating,
                    comment: response["review"].comment,
                    user_name: this.auth.getCurrentUserName(),
                    client_user_id: response["review"].client_user_id,
                    product_id: response["review"].product_id,
                    id: response["review"].id,
                    user_profile_img: (this.image.getImage()) ? this.image.getImage() : null
                  }
                );
              }
            }
          );
        }
      }
    } else {
      alert("Para hacer una valoración primero debes iniciar sesión");
    }
  }

}