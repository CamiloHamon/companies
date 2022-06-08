import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCompanies } from './show-all.component';

describe('ShowAllComponent', () => {
  let component: ShowAllCompanies;
  let fixture: ComponentFixture<ShowAllCompanies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCompanies ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCompanies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
