import './lifecycle/preload';
import edge from 'edge-js';
import './lifecycle/postload';
export declare class EdgeManager {
    static getEdgeInstance(): typeof edge;
}
