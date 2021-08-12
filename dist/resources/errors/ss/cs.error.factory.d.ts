import type { CSAggregateException, CSException } from './cs.error';
import { CSError } from './cs.error';
import './customs.cs.error';
export declare class CSErrorFactory {
    create(error: CSAggregateException | CSException): CSError;
}
