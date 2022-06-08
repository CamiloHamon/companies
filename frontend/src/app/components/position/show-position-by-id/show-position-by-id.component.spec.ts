import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPositionByIdComponent } from './show-position-by-id.component';

describe('ShowPositionByIdComponent', () => {
  let component: ShowPositionByIdComponent;
  let fixture: ComponentFixture<ShowPositionByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPositionByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPositionByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
