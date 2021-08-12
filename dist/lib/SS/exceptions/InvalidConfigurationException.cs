using System;
namespace SS
{
	public class InvalidConfigurationException
	: ArgumentException
	{
		public InvalidConfigurationException() : base()
		{
		}

		public InvalidConfigurationException(string? message) : base(message)
		{
		}

		public InvalidConfigurationException(string? message, Exception? innerException) : base(message, innerException)
		{
		}

		public InvalidConfigurationException(string? message, string? paramName) : base(message, paramName)
		{
		}

		public InvalidConfigurationException(string? message, string? paramName, Exception? innerException) : base(message, paramName, innerException)
		{
		}
	}
}