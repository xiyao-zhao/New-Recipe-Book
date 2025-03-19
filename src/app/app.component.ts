import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  clickedButton: string = 'recipe';

  buttonClickedHandler(button: string) {
    this.clickedButton = button;
  }
}
