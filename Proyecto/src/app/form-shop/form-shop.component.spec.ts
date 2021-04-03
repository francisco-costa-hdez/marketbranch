import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShopComponent } from './form-shop.component';

describe('FormShopComponent', () => {
  let component: FormShopComponent;
  let fixture: ComponentFixture<FormShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
