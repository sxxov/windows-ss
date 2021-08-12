import type { CSAggregateException, CSException } from './cs.error';
import { CSError } from './cs.error';
import './customs.cs.error';

export class CSErrorFactory {
	public create(error: CSAggregateException | CSException) {
		const obj = CSError.getInnerException(error);
		const CreatableCSError = CSError.csNameToCSError.get(obj.name);

		if (CreatableCSError == null) {
			return CSError.from(obj);
		}

		return CreatableCSError.from(obj);
	}
}
