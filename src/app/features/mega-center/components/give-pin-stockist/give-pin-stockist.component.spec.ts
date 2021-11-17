import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePinStockistComponent } from './give-pin-stockist.component';

describe('GivePinStockistComponent', () => {
  let component: GivePinStockistComponent;
  let fixture: ComponentFixture<GivePinStockistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivePinStockistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePinStockistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
