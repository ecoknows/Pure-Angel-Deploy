import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseVerificationComponent } from './purchase-verification.component';

describe('PurchaseVerificationComponent', () => {
  let component: PurchaseVerificationComponent;
  let fixture: ComponentFixture<PurchaseVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
