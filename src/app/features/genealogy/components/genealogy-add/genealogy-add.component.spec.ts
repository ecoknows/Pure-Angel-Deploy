import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyAddComponent } from './genealogy-add.component';

describe('GenealogyAddComponent', () => {
  let component: GenealogyAddComponent;
  let fixture: ComponentFixture<GenealogyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenealogyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenealogyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
