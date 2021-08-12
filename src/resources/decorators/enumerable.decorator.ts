// stolen wholesale from https://stackoverflow.com/a/61863345

export function enumerable(
	target: any,
	name: string
): void;
export function enumerable(
	target: any,
	name: string,
	desc: PropertyDescriptor
): PropertyDescriptor;
export function enumerable(target: any, name: string, desc?: any): any {
	if (desc) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		desc.enumerable = true;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return desc;
	}

	Object.defineProperty(target, name, {
		set(value) {
			Object.defineProperty(this, name, {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				value,
				enumerable: true,
				writable: true,
				configurable: true,
			});
		},
		enumerable: true,
		configurable: true,
	});
}

export function unenumerable(
	target: any,
	name: string
): void;
export function unenumerable(
	target: any,
	name: string,
	desc: PropertyDescriptor
): PropertyDescriptor;
export function unenumerable(target: any, name: string, desc?: any): any {
	if (desc) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		desc.enumerable = false;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return desc;
	}

	Object.defineProperty(target, name, {
		set(value) {
			Object.defineProperty(this, name, {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				value,
				writable: true,
				configurable: true,
			});
		},
		configurable: true,
	});
}
