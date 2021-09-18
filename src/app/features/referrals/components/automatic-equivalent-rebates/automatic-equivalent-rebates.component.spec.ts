import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticEquivalentRebatesComponent } from './automatic-equivalent-rebates.component';

describe('AutomaticEquivalentRebatesComponent', () => {
  let component: AutomaticEquivalentRebatesComponent;
  let fixture: ComponentFixture<AutomaticEquivalentRebatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticEquivalentRebatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticEquivalentRebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
