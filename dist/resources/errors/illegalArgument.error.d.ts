import { ClientError } from './client.error';
export declare class IllegalArgumentError extends ClientError {
    constructor(message: string, paramName?: string);
}
