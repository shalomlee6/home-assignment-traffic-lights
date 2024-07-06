import { LightColor } from "../const/const";
import { LightState } from "./light.state";
import { Road } from "./road";

export type JunctionState = {
    lightState: LightState;
    activeRoad: Road | undefined;
    horizontal: Road;
    vertical: Road;
}