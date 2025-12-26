
export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  PAIRING = 'PAIRING',
  DASHBOARD = 'DASHBOARD',
  ALERTS = 'ALERTS',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE',
  GEOFENCE = 'GEOFENCE'
}

export enum RiskLevel {
  LOW = 'Bajo',
  MEDIUM = 'Medio',
  HIGH = 'Alto'
}

export enum AlertType {
  MOTION = 'Inactividad por movimiento',
  TEMP = 'Inactividad por temperatura',
  BOTH = 'Riesgo Crítico (Movimiento + Temp)',
  AWAY = 'Fuera de casa'
}

export interface StoveState {
  isOn: boolean;
  isInUse: boolean;
  temperature: number;
  timeOnSeconds: number;
  lastActivity: string;
  riskLevel: RiskLevel;
  atHome: boolean;
}

export interface Alert {
  id: string;
  timestamp: string;
  type: AlertType;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

export interface HistoryEvent {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  icon: string;
}
