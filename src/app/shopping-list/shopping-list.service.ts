import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.addOrUpdateIngredient(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.addOrUpdateIngredient(ingredient);
    });
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addOrUpdateIngredient(ingredient: Ingredient) {
    const existing = this.ingredients.find(
      (ing) => ing.name === ingredient.name
    );

    if (existing) {
      existing.amount += ingredient.amount;
    } else {
      this.ingredients.push(JSON.parse(JSON.stringify(ingredient)));
    }
  }
}
