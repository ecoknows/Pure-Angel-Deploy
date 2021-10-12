import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseVerificationDialogComponent } from './purchase-verification-dialog.component';

describe('PurchaseVerificationDialogComponent', () => {
  let component: PurchaseVerificationDialogComponent;
  let fixture: ComponentFixture<PurchaseVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseVerificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
