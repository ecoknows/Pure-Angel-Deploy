import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyNodeComponent } from './genealogy-node.component';

describe('GenealogyNodeComponent', () => {
  let component: GenealogyNodeComponent;
  let fixture: ComponentFixture<GenealogyNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenealogyNodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenealogyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
