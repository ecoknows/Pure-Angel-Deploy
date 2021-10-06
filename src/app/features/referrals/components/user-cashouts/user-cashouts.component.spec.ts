import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCashoutsComponent } from './user-cashouts.component';

describe('UserCashoutsComponent', () => {
  let component: UserCashoutsComponent;
  let fixture: ComponentFixture<UserCashoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCashoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCashoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
