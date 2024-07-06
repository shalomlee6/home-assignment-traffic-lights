import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RoadComponent } from './road/road.component';
import { TrafficlightComponent } from './trafficlight/trafficlight.component';
import { junctionInitialState, LightColor, Orientation } from '../../shared/const/const';
import { JunctionState } from '../../shared/models/junction';

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
  horizontal!: number[];
  vertical!:number[];
  state: WritableSignal<JunctionState> = signal(junctionInitialState);
  horizontalCarCount:Signal<number> = computed(() => {
    return this.state().horizontal.carCount;
  });
  verticalCarCount:Signal<number> = computed(() => {
    return this.state().horizontal.carCount;
  });
  verticalToHorizontalRatio:Signal<number> = computed(() => {
    return this.verticalCarCount() / this.horizontalCarCount();
  });

  ngOnInit(): void {
    this.vertical = this.randCarCount();
    this.horizontal =  this.randCarCount();
    setInterval(() => {
      // update get referefnced value and returns updated value
      this.state.update( (state: JunctionState) =>{
        const newState = {...state};
        
        
        const reversed = {
          horizontal: this.getReversedColor(state.lightState.horizontal),
           vertical: this.getReversedColor(state.lightState.vertical) };
        newState.lightState = reversed;
        return newState;

      })
    },600)
  }
  getReversedColor(color: LightColor):LightColor{
    return color === LightColor.GREEN ? LightColor.RED : LightColor.GREEN ;
  }
  randCarCount():number[]{
    return Array.from({length: 1+Math.floor(Math.random()*3)})
  }
}
