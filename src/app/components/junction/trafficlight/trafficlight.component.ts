import { Component, ElementRef, input, Input, InputSignal, OnInit, ViewChild } from '@angular/core';
import { RoadService } from '../../../services/road-service/road.service';
import { LightState } from '../../../shared/models/light.state';

@Component({
  selector: 'trafficlight',
  standalone: true,
  imports: [],
  templateUrl: './trafficlight.component.html',
  styleUrl: './trafficlight.component.scss',
  providers: [RoadService]
})
export class TrafficlightComponent implements OnInit{
  carAmount!: number;
  lightState: InputSignal<LightState> = input.required();
  @ViewChild('light') light!: ElementRef;

  constructor(private roadService:RoadService){}

  ngOnInit(): void {
    
    this.carAmount = this.roadService.getRoadCarAmunt()
  }
}
