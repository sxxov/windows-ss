import { CSAggregateException, CSError, CSException } from './cs.error';
export interface CSArgumentError extends CSError {
    paramName: string;
}
export declare class CSArgumentError extends CSError {
    static from<T = CSArgumentError>(error: CSAggregateException | CSException): T;
}
