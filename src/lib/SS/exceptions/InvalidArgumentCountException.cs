using System;
namespace SS
{
	public class InvalidArgumentCountException
	: ArgumentException
	{
		public InvalidArgumentCountException() : base()
		{
		}

		public InvalidArgumentCountException(string? message) : base(message)
		{
		}

		public InvalidArgumentCountException(string? message, Exception? innerException) : base(message, innerException)
		{
		}

		public InvalidArgumentCountException(string? message, string? paramName) : base(message, paramName)
		{
		}

		public InvalidArgumentCountException(string? message, string? paramName, Exception? innerException) : base(message, paramName, innerException)
		{
		}
	}
}