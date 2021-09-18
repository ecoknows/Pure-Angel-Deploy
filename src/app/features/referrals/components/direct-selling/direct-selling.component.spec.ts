import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectSellingComponent } from './direct-selling.component';

describe('DirectSellingComponent', () => {
  let component: DirectSellingComponent;
  let fixture: ComponentFixture<DirectSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
