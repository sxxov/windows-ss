import './lifecycle/preload';
import edge from 'edge-js';
import './lifecycle/postload';

export class EdgeManager {
	public static getEdgeInstance() {
		return edge;
	}
}
