import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyDesignerComponent } from './genealogy-designer.component';

describe('GenealogyDesignerComponent', () => {
  let component: GenealogyDesignerComponent;
  let fixture: ComponentFixture<GenealogyDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenealogyDesignerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenealogyDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
