import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyChartComponent } from './genealogy-chart.component';

describe('GenealogyChartComponent', () => {
  let component: GenealogyChartComponent;
  let fixture: ComponentFixture<GenealogyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenealogyChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenealogyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
