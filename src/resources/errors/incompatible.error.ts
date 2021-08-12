import { ClientError } from './client.error';

export class IncompatibleError extends ClientError {
	constructor(message: string) {
		super(`Incompatible${message ? `:\n\n${message}` : ''}`);
	}
}
