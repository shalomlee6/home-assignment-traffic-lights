import { Component, computed, input, Input, model, ModelSignal, OnInit, Signal, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CarComponent } from '../../car/car.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../shared/models/road';

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
  @Input() classes!:string[];
  anim:'start' | 'end' = 'start';
  data:ModelSignal<Road> = model.required<Road>();
  cars:Signal<number[]> = computed( ()=> {
      const carsAmount = this.data().carCount;
      return Array.from({length: carsAmount});
  })
  ngOnInit(): void {
    
    if(this.classes.includes('vertical')){
      // this.setupVerticalRoad(start, end);
    }
  }

  cl(road:HTMLDivElement){
    // road.classList.remove('active-road');
    if(road.classList.contains('horizontal')) {
      road.classList.add('active-road');
    }
    this.anim = 'end'
  }
  setupVerticalRoad(start: number, end: number) {

  }
  
  bottom(){
    return Math.random()*75;
  }  

}

