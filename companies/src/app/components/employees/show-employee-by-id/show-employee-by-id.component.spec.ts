import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeByIdComponent } from './show-employee-by-id.component';

describe('ShowEmployeeByIdComponent', () => {
  let component: ShowEmployeeByIdComponent;
  let fixture: ComponentFixture<ShowEmployeeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEmployeeByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
