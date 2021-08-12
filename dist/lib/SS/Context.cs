using System.Collections.Generic;

namespace SS
{
	public struct Context
	{
		public string CurrentWorkingDirectory { get; private set; }

		public static Context From(IDictionary<string, object?> dictionary) {
			var instance = new Context();
			var nullableDictionary = (dynamic) NullableExpandoObject.From(dictionary);

			instance.CurrentWorkingDirectory = (string) nullableDictionary.currentWorkingDirectory ?? ".";

			return instance;
		}
	}
}
