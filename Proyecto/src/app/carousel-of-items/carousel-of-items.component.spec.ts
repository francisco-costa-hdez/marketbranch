import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOfItemsComponent } from './carousel-of-items.component';

describe('CarouselOfItemsComponent', () => {
  let component: CarouselOfItemsComponent;
  let fixture: ComponentFixture<CarouselOfItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselOfItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselOfItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
