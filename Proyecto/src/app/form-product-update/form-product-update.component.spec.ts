import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductUpdateComponent } from './form-product-update.component';

describe('UpdateFormProductComponent', () => {
  let component: FormProductUpdateComponent;
  let fixture: ComponentFixture<FormProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
