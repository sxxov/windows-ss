using System.Runtime.InteropServices;
using System;
using System.Collections.Generic;
namespace SS
{
	// should be identical (apart from casing) to the `Configuration` object in TS
	public struct Configuration
	{
		public const string DEFAULT_FORMAT = "bmp";
		public static string Format { get; private set; } = DEFAULT_FORMAT;
		public static PlainRectangle? Crop { get; private set; }
		public static PlainRectangle? Bounds { get; private set; }
		public static string? Save { get; private set; }

		public static void Apply(IDictionary<string, object?>? dictionary) {
			var nullableDictionary = (dynamic) NullableExpandoObject.From(dictionary);
			IDictionary<string, object>? rectDict;

			Save = (string?) nullableDictionary.save;
			Format = (string?) nullableDictionary.format ?? Save?[(Save.LastIndexOf(".") + 1)..] ?? DEFAULT_FORMAT;
			Crop = (rectDict = (IDictionary<string, object>?) nullableDictionary.crop) == null
				? null
				: PlainRectangle.From(rectDict);
			Bounds = (rectDict = (IDictionary<string, object>?) nullableDictionary.bounds) == null
				? null
				: PlainRectangle.From(rectDict);
		}
	}
}