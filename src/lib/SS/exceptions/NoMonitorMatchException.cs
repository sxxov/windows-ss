using System;

namespace SS
{
	public class NoMonitorMatchException
	: ArgumentException
	{
		public NoMonitorMatchException() : base()
		{
		}

		public NoMonitorMatchException(string? message) : base(message)
		{
		}

		public NoMonitorMatchException(string? message, Exception? innerException) : base(message, innerException)
		{
		}

		public NoMonitorMatchException(string? message, string? paramName) : base(message, paramName)
		{
		}

		public NoMonitorMatchException(string? message, string? paramName, Exception? innerException) : base(message, paramName, innerException)
		{
		}
	}
}