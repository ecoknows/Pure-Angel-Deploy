import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaCenterInfoComponent } from './mega-center-info.component';

describe('MegaCenterInfoComponent', () => {
  let component: MegaCenterInfoComponent;
  let fixture: ComponentFixture<MegaCenterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaCenterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaCenterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
