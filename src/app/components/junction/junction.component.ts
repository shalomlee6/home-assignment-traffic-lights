import { Component, OnInit } from '@angular/core';
import { RoadComponent } from './road/road.component';
import { TrafficlightComponent } from './trafficlight/trafficlight.component';

@Component({
  selector: 'junction',
  standalone: true,
  imports: [
    RoadComponent,
    TrafficlightComponent,
  ],
  templateUrl: './junction.component.html',
  styleUrl: './junction.component.scss'
})
export class JunctionComponent implements OnInit {
  clss:string[] = ['active-road','vertical'];
  horClss:string[] = ['horizontal'];
  data!: number[];
  data2!:number[];

  ngOnInit(): void {
    this.data =  [1,2,3]
    this.data2 = [4,5,6]
    // debugger
  }
  randCarCount():number[]{
    const arr = Array.from({length: 1+Math.floor(Math.random()*5)}) 
    const aarr = Array.from({length: 1+Math.floor(Math.random()*5)}) 
    return Array.from({length: 1+Math.floor(Math.random()*3)})

  }

}
