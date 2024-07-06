import { Component, input, Input, model, ModelSignal, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CarComponent } from '../../car/car.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'road',
  standalone: true,
  imports: [CommonModule, CarComponent, FormsModule],
  templateUrl: './road.component.html',
  styleUrl: './road.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('moveCar', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(-20rem)' })), 
      transition('start => end', [
        animate('2s linear') 
      ])
    ])
  ]
})
export class RoadComponent implements OnInit{
  // @Input() carCount!:number[];
  @Input() classes!:string[];
  anim:'start' | 'end' = 'start';
  data:ModelSignal<number[]> = model.required<number[]>();

  ngOnInit(): void {
    
    if(this.classes.includes('vertical')){
      // this.setupVerticalRoad(start, end);
    }
  }
cl(road:HTMLDivElement){
  road.classList.remove('active-road');
  this.anim = 'end'
}
  setupVerticalRoad(start: number, end: number) {

  }
bottom(){
  return Math.random()*75;
}  

}

type Road = {
  orientation:string;
  start: number;
  end: number;
  width: number;
  carCount:number;
}
