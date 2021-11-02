import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesstockInventoryComponent } from './featuresstock-inventory.component';

describe('FeaturesstockInventoryComponent', () => {
  let component: FeaturesstockInventoryComponent;
  let fixture: ComponentFixture<FeaturesstockInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesstockInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesstockInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
