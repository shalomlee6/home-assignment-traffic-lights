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


  }

  onStart() {
    setInterval(() => {
      // update get referefnced value and returns updated value
      this.state.update( (state: JunctionState) =>{
        const newState = {...state};
        const switchLight = this.getLightState()
        newState.lightState = switchLight;

        if(this.horizontalRoad.animationStateX === 'end' && this.horizontalCarCount() === 0) {
          // this.horizontalRoad.animationStateX = 'start'
          this.state().horizontal.carCount = this.randCarCount();
        }
        if(this.verticalRoad.animationStateY === 'end' && this.verticalCarCount() === 0) {
          // this.verticalRoad.animationStateY = 'start';
          this.state().vertical.carCount =  this.randCarCount();
        }

        return newState;

      })
    },2000)

  }

  randCarCount():number{
    return 1+Math.floor(Math.random()*3)
  }

  getLightState() {

    if(this.horizontalCarCount() > this.verticalCarCount() ) {

      if(this.horizontalRoad.animationStateX === 'start') {
        this.horizontalRoad.toggleAnimationX()
      }
      return {
        horizontal: LightColor.GREEN,
        vertical: LightColor.RED
      };
    }
    if(this.horizontalCarCount() < this.verticalCarCount() && this.verticalRoad.animationStateY === 'start') {
      this.verticalRoad.toggleAnimationY()
      return {
        horizontal: LightColor.RED,
        vertical: LightColor.GREEN
      };
    }
    if(this.horizontalCarCount() === this.verticalCarCount() && this.horizontalCarCount() > 0 && this.verticalCarCount() > 0 && this.horizontalRoad.animationStateX === 'start') {
      this.horizontalRoad.toggleAnimationX()
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
      horizontal: LightColor.GREEN,
      vertical: LightColor.RED
    };
  }
}
