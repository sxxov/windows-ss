import { ClientError } from './client.error';

export class IncorrectUsageError extends ClientError {
	constructor(message: string) {
		super(`Incorrect usage of item${message ? `: ${message}` : ''}`);
	}
}
