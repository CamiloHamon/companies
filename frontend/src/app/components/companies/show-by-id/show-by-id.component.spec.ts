import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeesByCompanyId } from './show-by-id.component';

describe('ShowByIdComponent', () => {
  let component: ShowEmployeesByCompanyId;
  let fixture: ComponentFixture<ShowEmployeesByCompanyId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEmployeesByCompanyId ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeesByCompanyId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
