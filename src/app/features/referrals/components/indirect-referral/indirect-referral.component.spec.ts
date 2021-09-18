import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectReferralComponent } from './indirect-referral.component';

describe('IndirectReferralComponent', () => {
  let component: IndirectReferralComponent;
  let fixture: ComponentFixture<IndirectReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndirectReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
