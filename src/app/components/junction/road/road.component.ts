import { Component, computed, ElementRef, EventEmitter, input, Input, model, ModelSignal, OnInit, Output, Signal, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CarComponent } from '../../car/car.component';
import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';
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
    trigger('moveCarX', [
      state('start', style({ transform: 'translateX(0)'})),
      state('end', style({ transform: 'translateX(-20rem)' })), 
      transition('start => end', [
        animate('2s linear') 
      ])
    ]),
    trigger('moveCarY', [
      state('start', style({ transform: 'translateY(0)'})),
      state('end', style({ transform: 'translateY(18rem)' })), 
      transition('start => end', [
        animate('2s linear') 
      ])
    ])
  ]
  
})
export class RoadComponent implements OnInit{
  
  @Input() classes!:string[];
  @Output() carsInRoad: EventEmitter<{orientation: string, carCount: number }> = new EventEmitter();
  @ViewChild('road') road!: ElementRef;

  animationEnded: boolean = false;
  orientation!: string;
  animationStateX:'start' | 'end' = 'start';
  animationStateY:'start' | 'end' = 'start';
  data:ModelSignal<Road> = model.required<Road>();
  cars!:number[];
  ngOnInit(): void {
    
    if(this.classes.includes('vertical')){
      // this.setupVerticalRoad(start, end);
      this.orientation = 'vertical' 
    }else {
      this.orientation = 'horizontal'
    }
    const carsAmount = this.data().carCount;
    this.cars = Array.from({length: carsAmount});
  }

  toggleAnimationX() {
    
    // add activeRoad Horizontal for smooth animation
    this.road.nativeElement.classList.add('active-road');
    // Clear the cars
    this.animationEnded = false;
    // if(this.data().carCount === 0) {
    //   const carsAmount = this.data().carCount;
    //   this.cars = Array.from({length: carsAmount});
    // }
    this.animationStateX =  this.animationStateX === 'start' ? 'end' : 'start';
    // setTimeout(() => {
    //   // trigger animation
    // }, 2000); // Adjust delay as needed
  }

  toggleAnimationY() {
    // Clear the cars
    this.animationEnded = false;
    // trigger animation
    this.animationStateY =  this.animationStateY === 'start' ? 'end' : 'start';
    // setTimeout(() => {
    // }, 2000); // Adjust delay as needed
   
  }

  onXAnimationEnd(road:HTMLDivElement) {
    if(this.data().carCount < 1 ) return;
    // remove activeRoad Horizontal for smooth animation
    if(road.classList.contains('horizontal') && this.animationStateX === 'end') {
      road.classList.remove('active-road');
    }
    
    if(this.animationStateX === 'end') {
      this.animationEnded = true;
      this.data().carCount= this.data().carCount - 1;
      this.cars = Array.from({length: this.data().carCount});
      // if(this.data().carCount === 0 ){
      //   this.toggleAnimationX()
      // }
    }
  }

  onYAnimationEnd() {
    if(this.data().carCount < 1 ) return;
    
    if(this.animationStateY === 'end') {
      this.animationEnded = true;
      this.data().carCount= this.data().carCount - 1;
      
      this.cars = Array.from({length: this.data().carCount});
      // if(this.data().carCount === 0 ){
      //   this.toggleAnimationY()
      // }
    }
  }

}

