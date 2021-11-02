import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPinComponent } from './create-new-pin.component';

describe('CreateNewPinComponent', () => {
  let component: CreateNewPinComponent;
  let fixture: ComponentFixture<CreateNewPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
