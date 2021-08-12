import { CSAggregateException, CSError, CSException } from './cs.error';

interface CSArgumentException extends CSException {
	ParamName: string;
}

export interface CSArgumentError extends CSError {
	paramName: string;
}

/**
 * Based on C#'s `ArgumentException`.
 */
@CSError.creatable('System.ArgumentError')
export class CSArgumentError extends CSError {
	public static from<T = CSArgumentError>(error: CSAggregateException | CSException): T {
		const instance = super.from(error);

		(instance as CSArgumentError).paramName = (instance.raw as CSArgumentException).ParamName;

		// @ts-expect-error
		return instance;
	}
}
