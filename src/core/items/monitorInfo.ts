import type { PlainRectangle } from './plainRectangle';

export interface MonitorInfo {
	monitor: PlainRectangle;
	workArea: PlainRectangle;
	deviceName: string;
}
