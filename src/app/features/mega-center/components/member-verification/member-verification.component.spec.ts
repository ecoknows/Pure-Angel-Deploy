import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVerificationComponent } from './member-verification.component';

describe('MemberVerificationComponent', () => {
  let component: MemberVerificationComponent;
  let fixture: ComponentFixture<MemberVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
