import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllEmlpoyeesComponent } from './show-all-emlpoyees.component';

describe('ShowAllEmlpoyeesComponent', () => {
  let component: ShowAllEmlpoyeesComponent;
  let fixture: ComponentFixture<ShowAllEmlpoyeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllEmlpoyeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllEmlpoyeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
