import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  @Output() control = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.control.emit(false);
  }
}
