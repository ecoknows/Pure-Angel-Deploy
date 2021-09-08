import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTotalNumberComponent } from './card-total-number.component';

describe('CardTotalNumberComponent', () => {
  let component: CardTotalNumberComponent;
  let fixture: ComponentFixture<CardTotalNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTotalNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTotalNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
