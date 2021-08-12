import { CSArgumentError } from './argument.cs.error';
/**
 * Thrown when an invalid amount of arguments were provided.
 */
export declare class InvalidArgumentCountError extends CSArgumentError {
}
/**
 * Thrown when an invalid Configuration object was provided.
 */
export declare class InvalidConfigurationError extends CSArgumentError {
}
/**
 * Thrown when no match can be found with the provided arguments.
 */
export declare class NoMatchError extends CSArgumentError {
}
