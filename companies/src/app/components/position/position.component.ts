import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActivate(e: any) {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
