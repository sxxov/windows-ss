import { CSArgumentError } from './argument.cs.error';
import { CSError } from './cs.error';

/**
 * Thrown when an invalid amount of arguments were provided.
 */
@CSError.creatable('SS.InvalidArgumentCountException')
export class InvalidArgumentCountError extends CSArgumentError {}

/**
 * Thrown when an invalid Configuration object was provided.
 */
@CSError.creatable('SS.InvalidConfigurationException')
export class InvalidConfigurationError extends CSArgumentError {}

/**
 * Thrown when no match can be found with the provided arguments.
 */
@CSError.creatable('SS.NoMonitorMatchException')
export class NoMatchError extends CSArgumentError {}
