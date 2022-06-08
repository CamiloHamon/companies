import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeesByCompanyIdComponent } from './show-employees-by-company-id.component';

describe('ShowEmployeesByCompanyIdComponent', () => {
  let component: ShowEmployeesByCompanyIdComponent;
  let fixture: ComponentFixture<ShowEmployeesByCompanyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEmployeesByCompanyIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeesByCompanyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
