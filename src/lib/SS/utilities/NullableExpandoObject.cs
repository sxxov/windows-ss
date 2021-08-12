using System;
using System.Collections.Generic;
using System.Dynamic;

namespace SS
{
	public class NullableExpandoObject : DynamicObject
	{
		private IDictionary<string, object?> Dictionary = new Dictionary<string, object?>();

		public override bool TryGetMember(GetMemberBinder binder, out object? result)
		{
			try {
				result = Dictionary[binder.Name];
			} catch (Exception) {
				result = null;
			}

			return true;
		}

		public override bool TrySetMember(SetMemberBinder binder, object? value)
		{
			Dictionary[binder.Name] = value;

			return true;
		}

		public static NullableExpandoObject From(IDictionary<string, object?>? dictionary) {
			if (dictionary == null) {
				return new NullableExpandoObject();
			}

			return new NullableExpandoObject
			{
				Dictionary = dictionary
			};
		}
	}
}