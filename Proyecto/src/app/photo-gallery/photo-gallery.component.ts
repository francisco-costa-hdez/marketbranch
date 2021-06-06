import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  @Input() images;
  @Output() control = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.control.emit(false);
  }
}
