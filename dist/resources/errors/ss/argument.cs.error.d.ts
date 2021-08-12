import { CSAggregateException, CSError, CSException } from './cs.error';
export interface CSArgumentError extends CSError {
    paramName: string;
}
/**
 * Based on C#'s `ArgumentException`.
 */
export declare class CSArgumentError extends CSError {
    static from<T = CSArgumentError>(error: CSAggregateException | CSException): T;
}
