import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPositionsComponent } from './show-all-positions.component';

describe('ShowAllPositionsComponent', () => {
  let component: ShowAllPositionsComponent;
  let fixture: ComponentFixture<ShowAllPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
