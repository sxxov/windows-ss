import { CSArgumentError } from './argument.cs.error';
import { CSError } from './cs.error';

@CSError.creatable('SS.InvalidArgumentCountException')
export class InvalidArgumentCountError extends CSArgumentError {}

@CSError.creatable('SS.InvalidConfigurationException')
export class InvalidConfigurationError extends CSArgumentError {}

@CSError.creatable('SS.NoMonitorMatchException')
export class NoMatchError extends CSArgumentError {}
