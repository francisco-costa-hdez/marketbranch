import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShopValidComponent } from './form-shop-valid.component';

describe('FormShopValidComponent', () => {
  let component: FormShopValidComponent;
  let fixture: ComponentFixture<FormShopValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormShopValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShopValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
