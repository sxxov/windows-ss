namespace SS
{
	public class MonitorInfo
	{
		public PlainRectangle Monitor;
		public PlainRectangle WorkArea;
		public string DeviceName;

		public MonitorInfo(PlainRectangle monitor, PlainRectangle workArea, string deviceName)
		{
			Monitor = monitor;
			WorkArea = workArea;
			DeviceName = deviceName;
		}
	}
}