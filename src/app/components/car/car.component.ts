import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',

})
export class CarComponent {

}

type Car = {
  position: number;
  canGoForward: boolean;
}
