using System;

namespace SS
{
	public class NoMatchException
	: ArgumentException
	{
		public NoMatchException() : base()
		{
		}

		public NoMatchException(string? message) : base(message)
		{
		}

		public NoMatchException(string? message, Exception? innerException) : base(message, innerException)
		{
		}

		public NoMatchException(string? message, string? paramName) : base(message, paramName)
		{
		}

		public NoMatchException(string? message, string? paramName, Exception? innerException) : base(message, paramName, innerException)
		{
		}
	}
}