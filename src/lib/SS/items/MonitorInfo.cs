namespace SS
{
	// mirrors the TS object
	public class MonitorInfo
	{
		public PlainRectangle monitor;
		public PlainRectangle workArea;
		public string deviceName;

		public MonitorInfo(PlainRectangle monitor, PlainRectangle workArea, string deviceName)
		{
			this.monitor = monitor;
			this.workArea = workArea;
			this.deviceName = deviceName;
		}
	}
}