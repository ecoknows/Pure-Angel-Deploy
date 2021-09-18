import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReferralComponent } from './direct-referral.component';

describe('DirectReferralComponent', () => {
  let component: DirectReferralComponent;
  let fixture: ComponentFixture<DirectReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
