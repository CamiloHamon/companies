import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'companies';
  onActivate(e: any) {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
