import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() buttonClicked = new EventEmitter<string>();

  onRecipeClick() {
    this.buttonClicked.emit('recipe');
  }

  onShoppingListClick() {
    this.buttonClicked.emit('shopping-list');
  }
}
