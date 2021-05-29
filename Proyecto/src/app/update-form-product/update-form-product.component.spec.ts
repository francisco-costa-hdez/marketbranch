import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormProductComponent } from './update-form-product.component';

describe('UpdateFormProductComponent', () => {
  let component: UpdateFormProductComponent;
  let fixture: ComponentFixture<UpdateFormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFormProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
