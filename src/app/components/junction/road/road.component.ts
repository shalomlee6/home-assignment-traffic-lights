import { Component, ElementRef, EventEmitter, Input,OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarComponent } from '../../car/car.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../shared/models/road';
import { Orientation } from '../../../shared/const/const';

@Component({
  selector: 'road',
  standalone: true,
  imports: [CommonModule, CarComponent, FormsModule],
  templateUrl: './road.component.html',
  styleUrl: './road.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('moveCarX', [
      transition(':enter', [
        style({ transform: 'translateX(5rem)'}),
        animate('2s linear',style({ transform: 'translateX(0rem)'})) 
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0rem)'}),
        animate('2s linear',style({ transform: 'translateX(-20rem)'})) 
      ]),
    ]),
    trigger('moveCarY', [
      transition(':enter', [
        style({ transform: 'translateY(-3rem)'}),
        animate('2s linear',style({ transform: 'translateY(0)'})) 
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0rem)'}),
        animate('2s linear',style({ transform: 'translateY(18rem)'})) 
      ])
    ]),
  ]
  
})
export class RoadComponent implements OnInit,OnChanges{

  @Input() data!:Road;
  @Input() classes!:string[];
  @Output() carsInRoad: EventEmitter<{orientation: string, carCount: number }> = new EventEmitter();
  @ViewChild('road') road!: ElementRef;
  animationEndedX: boolean = false;
  animationEndedY: boolean = false;
  orientation!: string;
  animationStateX:'start' | 'end' = 'start';
  animationStateY:'start' | 'end' = 'start';
  cars!:number[];

  ngOnInit(): void {
    if(this.classes.includes('vertical')){
      this.orientation = 'vertical' 
    }else {
      this.orientation = 'horizontal'
    }
  }

  ngOnChanges(): void {
    if(this.data.carCount > 0 ) {
      this.cars = [...Array.from({length: this.data.carCount}) as number[]];
      if(this.data.orientation === Orientation.HORIZONTAL && this.animationStateX === 'end') {
        this.toggleAnimationX()
      }
      if(this.data.orientation === Orientation.VERTICAL && this.animationStateY === 'end') {
        this.toggleAnimationY()
      }
    }
  }

  toggleAnimationX() {
    
    // add activeRoad Horizontal for smooth animation
    this.road.nativeElement.classList.add('active-road');
    // Clear the cars
    this.animationEndedX = false;
    this.animationStateX =  this.animationStateX === 'start' ? 'end' : 'start';
  }

  toggleAnimationY() {
    // Clear the cars
    this.animationEndedY = false;
    // trigger animation
    this.animationStateY =  this.animationStateY === 'start' ? 'end' : 'start';
  }

  onXAnimationEnd(id:number) {
    if(this.data.carCount < 1 ) return;

    if(this.animationStateX === 'end') {
      this.cars.splice(id);
      this.data.carCount= this.data.carCount - 1;
      if(this.data.carCount === 0 ) {
        this.animationEndedX = true;
        // remove activeRoad Horizontal for smooth animation
        setTimeout(()=> {
          this.road.nativeElement.classList.remove('active-road');
        },1000)
        
        setTimeout( ()=> {
          this.carsInRoad.emit({orientation: 'horizontal', carCount: 0})
        },10000 )
      }
    }
  }

  onYAnimationEnd(id:number) {
    if(this.data.carCount < 1 ) return;
    
    if(this.animationStateY === 'end') {
      this.cars.splice(id);
      this.data.carCount= this.data.carCount - 1;
      if(this.data.carCount === 0 ) {
        this.animationEndedY = true;
        setTimeout( ()=> {
          this.carsInRoad.emit({orientation: 'vertical', carCount: 0})
        },12000 )
      }
    }
  }
}

