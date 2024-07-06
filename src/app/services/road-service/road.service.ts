import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoadService {
  
  constructor() { }

  getRoadCarAmunt(): number {
    return 2
  }
}
