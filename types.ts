export enum CircuitType {
  SERIES = 'SERIES',
  PARALLEL = 'PARALLEL',
  HOME = 'HOME'
}

export interface CircuitState {
  isSwitchClosed: boolean;
  isSwitch2Closed?: boolean; // For parallel branch 2
  batteryVoltage: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
