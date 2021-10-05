import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutDialogComponent } from './cashout-dialog.component';

describe('CashoutDialogComponent', () => {
  let component: CashoutDialogComponent;
  let fixture: ComponentFixture<CashoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashoutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
