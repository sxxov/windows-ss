export class ClientError extends Error {
	constructor(message = 'No message provided, an error with errors?') {
		super(message);
		this.name = this.constructor.name;

		// eslint is drunk
		// eslint-disable-next-line
		(Error as any).captureStackTrace?.(this, this.constructor);
	}

	// like a "from" call, but more ambiguous
	public static toError<T extends ClientError>(obj: PlainErrorObject | Error): T {
		const clientError = new this();

		clientError.name = obj.name;
		clientError.message = obj.message;
		clientError.stack = obj.stack;

		// @ts-expect-error
		return clientError;
	}

	public toPlainObject(): PlainErrorObject {
		return {
			name: this.name,
			message: this.message,
			stack: this.stack,
		};
	}
}

export interface PlainErrorObject {
	name: string;
	message: string;
	stack?: string;
}
