import { unenumerable } from '../../decorators/enumerable.decorator';
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

/**
 * Based on C#'s `SystemException`.
 */
export class CSError extends ClientError {
	@unenumerable
	public raw!: CSException;

	public static csNameToCSError: Map<string, typeof CSError> = new Map();

	protected constructor(message: string) {
		super(message);
	}

	public static from<T = CSError>(error: CSAggregateException | CSException): T {
		const obj = this.getInnerException(error);
		const instance = new this(obj.message);

		instance.stack = `${instance.stack ? `${instance.stack}\n` : ''}[C#]\n${obj.StackTrace}`;
		instance.raw = obj;

		// @ts-expect-error
		return instance;
	}

	public static getInnerException(error: CSAggregateException | CSException) {
		return (error as CSAggregateException).InnerException
			? (error as CSAggregateException).InnerException
			: error as CSException;
	}

	public static creatable<T extends typeof CSError>(csName: string) {
		return (target: T) => {
			this.csNameToCSError.set(csName, target);
		};
	}
}

