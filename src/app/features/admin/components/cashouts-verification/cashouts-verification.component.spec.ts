import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutsVerificationComponent } from './cashouts-verification.component';

describe('CashoutsVerificationComponent', () => {
  let component: CashoutsVerificationComponent;
  let fixture: ComponentFixture<CashoutsVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashoutsVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
