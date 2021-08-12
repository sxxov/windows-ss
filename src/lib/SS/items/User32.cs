using System.Runtime.InteropServices;

namespace SS
{
	[StructLayout(LayoutKind.Sequential)]
	public struct RECT
	{
		public int left;
		public int top;
		public int right;
		public int bottom;
	}

	[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
	public struct MONITORINFOEX
	{
		public uint size;
		public RECT Monitor;
		public RECT WorkArea;
		public uint Flags;
		[MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
		public string DeviceName;
	}
}