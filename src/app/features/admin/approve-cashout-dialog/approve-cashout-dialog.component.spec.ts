import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCashoutDialogComponent } from './approve-cashout-dialog.component';

describe('ApproveCashoutDialogComponent', () => {
  let component: ApproveCashoutDialogComponent;
  let fixture: ComponentFixture<ApproveCashoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveCashoutDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCashoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
