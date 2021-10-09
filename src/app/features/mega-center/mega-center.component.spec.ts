import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaCenterComponent } from './mega-center.component';

describe('MegaCenterComponent', () => {
  let component: MegaCenterComponent;
  let fixture: ComponentFixture<MegaCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
