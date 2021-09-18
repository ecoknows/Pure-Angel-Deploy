import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairingBonusComponent } from './pairing-bonus.component';

describe('PairingBonusComponent', () => {
  let component: PairingBonusComponent;
  let fixture: ComponentFixture<PairingBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairingBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairingBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
