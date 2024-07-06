

export enum LightColor {
    RED = 'red',
    GREEN = 'green'
} 

export enum Orientation {
   HORIZONTAL = 'horizontal',
   VERTICAL =  'vertical'
} 
export const initialLight = {
    'horizontal': LightColor.GREEN,
    'vertical': LightColor.RED
}
export const junctionInitialState = {
    lightState: initialLight,
    activeRoad: undefined,
    horizontal: {
        orientation:Orientation.HORIZONTAL,
        carCount:4
    },
    vertical: {
        orientation:Orientation.VERTICAL,
        carCount:2
    }
} as const