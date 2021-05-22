import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnChanges {

  @Input() review;
  owner: boolean = false;
  edit: boolean = false;

  reviewEditForm:FormGroup;
  reviewEdit = {rating:"", comment:"", client_user_id: "", product_id: ""};


  // user;
  constructor(private db: MarketPlaceDBService, private auth: AuthService, private form: FormBuilder) {
    this.reviewEditForm=this.form.group(
      {
        ratingEdit:['',Validators.required],
        commentEdit:['',Validators.required]
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['review'].currentValue.client_user_id) {
      this.owner = this.canEdit(changes['review'].currentValue.client_user_id);
    }
  }
  
  get ratingEdit() { return this.reviewEditForm.get('ratingEdit'); }
  get commentEdit() { return this.reviewEditForm.get('commentEdit'); }

  onSubmit() {
    if (this.auth.isAuthenticated() && this.canEdit(this.review.client_user_id)) {
      console.log(this.reviewEdit);
      if(this.reviewEditForm.valid) {
        this.reviewEdit.rating = this.ratingEdit.value;
        this.reviewEdit.comment = this.commentEdit.value;
        this.reviewEdit.client_user_id = this.auth.getCurrentUserId().toString();
        this.reviewEdit.product_id = this.review.product_id;
        if (this.review.rating && this.review.comment && this.review.client_user_id && this.review.product_id) {
          console.log("submitting")
          this.db.updateReview(this.review.id, this.reviewEdit).subscribe(
            (response) => {
              if (response["message"] == "Review modificada correctamente") {
                this.review.comment = this.commentEdit.value;
                this.review.rating = this.ratingEdit.value;
                this.formEdit();
              }
            }
          );
        }
        console.log(this.reviewEdit);
      } else {
        alert("Ha surgido un error")
        this.formEdit();
      }
    } else {
      alert("Para hacer una valoración primero debes iniciar sesión");
    }
  }

  formEdit() {
    this.ratingEdit.setValue(this.review.rating);
    this.commentEdit.setValue(this.review.comment);
    this.edit = this.canEdit(this.review.client_user_id) ? !this.edit : false;
  }

  canEdit (user_id) {
    if (this.auth.isAuthenticated) {
      return (this.auth.getCurrentUserId() == user_id) ? true : false;
    }
  }

  cancelEdit() {
    this.ratingEdit.setValue(this.review.rating);
    this.commentEdit.setValue(this.review.comment);
    this.edit = false;
  }

  deleteReview() {
    if (this.auth.isAuthenticated() && this.canEdit(this.review.client_user_id)) {
      this.db.deleteReview(this.review.id).subscribe(
        (response) => {
          console.log(response);
          this.review = null;
        }
      )
    }
  }

}
