import { ClientError } from './client.error';

export class IllegalArgumentError extends ClientError {
	constructor(message: string, paramName?: string) {
		super(`Illegal argument${paramName ? ` from parameter — "${paramName}"` : ''}${message ? `:\n\n${message}` : ''}`);
	}
}
