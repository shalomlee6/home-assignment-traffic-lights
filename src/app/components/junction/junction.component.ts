import { Component, computed, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { RoadComponent } from './road/road.component';
import { TrafficlightComponent } from './trafficlight/trafficlight.component';
import { junctionInitialState, LightColor, Orientation } from '../../shared/const/const';
import { JunctionState } from '../../shared/models/junction';

@Component({
  selector: 'junction',
  standalone: true,
  imports: [ RoadComponent,TrafficlightComponent,],
  templateUrl: './junction.component.html',
  styleUrl: './junction.component.scss'
})
export class JunctionComponent implements OnInit {
  horClss:string[] = ['horizontal'];
  clss:string[] = ['active-road','vertical'];
  @ViewChild('horizontal') horizontalRoad!: RoadComponent;
  @ViewChild('vertical') verticalRoad!: RoadComponent;


  state: WritableSignal<JunctionState> = signal(junctionInitialState);

  horizontalCarCount:Signal<number> = computed(() => {
    return this.state().horizontal.carCount;
  });
  verticalCarCount:Signal<number> = computed(() => {
    return this.state().vertical.carCount;
  });

  ngOnInit(): void {
    //this.onStart()
  }
  onStart() {
    setInterval(() => {
      // update get referefnced value and returns updated value
      this.state.update( (state: JunctionState) =>{
        const newState = {...state};
        const switchLight = this.getLightState()
        newState.lightState = switchLight;
        this.setAnimation()

        return newState;

      })
    },2000)

  }

  randCarCount():number{
    return 1+Math.floor(Math.random()*3)
  }

  getLightState() {

    if(this.horizontalCarCount() > this.verticalCarCount() ) {
      return {
        horizontal: LightColor.GREEN,
        vertical: LightColor.RED
      };
    }
    if(this.horizontalCarCount() < this.verticalCarCount()) {
      return {
        horizontal: LightColor.RED,
        vertical: LightColor.GREEN
      };
    }
    if(this.horizontalCarCount() === this.verticalCarCount() && this.horizontalCarCount() > 0 && this.verticalCarCount() > 0) {
      return {
        horizontal: LightColor.GREEN,
        vertical: LightColor.RED
      };
    }
    if(this.horizontalCarCount() === 0 && this.verticalCarCount() === 0) {
      return {
        horizontal: LightColor.RED,
        vertical: LightColor.RED
      }
    }

    return {
      horizontal: LightColor.RED,
      vertical: LightColor.RED
    };
  }

  setAnimation(){
    
    if(this.state().lightState.horizontal === LightColor.GREEN && this.state().lightState.vertical === LightColor.RED ) {
      if(this.horizontalRoad.animationStateX === 'start') {
        this.horizontalRoad.toggleAnimationX()
      }
    }
    if(this.state().lightState.horizontal === LightColor.RED && this.state().lightState.vertical === LightColor.GREEN ) {
      if(this.verticalRoad.animationStateY === 'start') {
        this.verticalRoad.toggleAnimationY();
      }
    }
    if(this.state().lightState.horizontal === LightColor.RED && this.state().lightState.vertical === LightColor.RED) {
      if(this.horizontalRoad.animationStateX === 'start') {
        this.horizontalRoad.toggleAnimationX()
      }
    }
  }

  onMoreCars( event: any) {
    
    if(event.orientation === Orientation.HORIZONTAL) {
      this.state.update((state:JunctionState) =>  ({
        ...state,
         horizontal:{
          carCount: this.randCarCount(),
          orientation: Orientation.HORIZONTAL 
         }
      }));
    }
    if(event.orientation === Orientation.VERTICAL) {
      this.state.update((state:JunctionState) =>  ({
        ...state,
         vertical:{
          carCount: this.randCarCount(),
          orientation: Orientation.VERTICAL 
         }
      }));
    }
    
  }
}
