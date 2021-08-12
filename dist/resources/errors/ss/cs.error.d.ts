import { ClientError } from '../client.error';
export interface CSBaseException extends Error {
    Message: string;
    Data: string;
}
export interface CSException extends CSBaseException {
    TargetSite: string;
    StackTrace: string;
    Source: string;
    HResult: number;
}
export interface CSAggregateException extends CSBaseException {
    InnerException: CSException;
}
export declare class CSError extends ClientError {
    raw: CSException;
    static csNameToCSError: Map<string, typeof CSError>;
    protected constructor(message: string);
    static from<T = CSError>(error: CSAggregateException | CSException): T;
    static getInnerException(error: CSAggregateException | CSException): CSException;
    static creatable<T extends typeof CSError>(csName: string): (target: T) => void;
}
