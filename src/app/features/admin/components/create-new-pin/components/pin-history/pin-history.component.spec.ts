import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinHistoryComponent } from './pin-history.component';

describe('PinHistoryComponent', () => {
  let component: PinHistoryComponent;
  let fixture: ComponentFixture<PinHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
