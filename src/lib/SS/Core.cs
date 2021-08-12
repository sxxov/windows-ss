using System.Diagnostics;
using System.IO;
using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using Microsoft.VisualBasic;

namespace SS
{
	public static class Core
	{
		private static Context Ctx;

		public static void Load(Context context)
		{
			Shcore.SetProcessDpiAwareness(2);

			Ctx = context;
		}

		public static Image CaptureActiveWindow()
		{
			return CaptureWindow(User32.GetForegroundWindow());
		}

		public static Image CaptureWindow(string title)
		{
			return CaptureWindow(GetWindowHandleFrom(title));
		}

		private static Image CaptureWindow(IntPtr handle)
		{
			// get te hDC of the target window
			var hdcSrc = User32.GetWindowDC(handle);
			// get the size
			var windowRect = new RECT();

			User32.GetWindowRect(handle, ref windowRect);

			var hdc = User32.GetDC(IntPtr.Zero);
			var monitorHandle = User32.MonitorFromWindow(handle, 2);
			Image? image = null;

			User32.EnumDisplayMonitors(
				hdc,
				IntPtr.Zero,
				(IntPtr hMonitor, IntPtr hdcMonitor, ref RECT _, IntPtr __) =>
				{
					if (image != null)
					{
						return true;
					}

					var mi = new MONITORINFOEX();

					mi.size = (uint) Marshal.SizeOf(mi);
					User32.GetMonitorInfo(hMonitor, ref mi);

					if (hMonitor == monitorHandle)
					{
						image = CaptureWindowFromDC(hdcMonitor, PlainRectangle.From(windowRect));
					}

					return true;
				},
				IntPtr.Zero
			);
			User32.ReleaseDC(IntPtr.Zero, hdc);

			return image!;

			// User32.ReleaseDC(handle, hdcSrc);
			// return img;
		}

    	private static Image CaptureWindowFromDC(IntPtr hdcSrc, PlainRectangle rect)
		{
            if (Configuration.Bounds != null)
            {
                rect.right = rect.left + Configuration.Bounds.right;
                rect.left += Configuration.Bounds.left;
                rect.bottom = rect.top + Configuration.Bounds.bottom;
                rect.top += Configuration.Bounds.top;
            }

            if (Configuration.Crop != null)
            {
                rect.left += Configuration.Crop.left;
                rect.top += Configuration.Crop.top;
                rect.right -= Configuration.Crop.right;
                rect.bottom -= Configuration.Crop.bottom;
            }

			// get the size
			var width = rect.GetWidth();
			var height = rect.GetHeight();

			// create a device context we can copy to
			var hdcDest = GDI32.CreateCompatibleDC(hdcSrc);
			// create a bitmap we can copy it to,
			// using GetDeviceCaps to get the width/height
			var hBitmap = GDI32.CreateCompatibleBitmap(hdcSrc, width, height);
			// select the bitmap object
			var hOld = GDI32.SelectObject(hdcDest, hBitmap);
			// bitblt over
			GDI32.BitBlt(hdcDest, 0, 0, width, height, hdcSrc, rect.left, rect.top, GDI32.SRCCOPY);
			// restore selection
			GDI32.SelectObject(hdcDest, hOld);
			// clean up
			GDI32.DeleteDC(hdcDest);
			// get a .NET image object for it
			var img = Image.FromHbitmap(hBitmap);
			// free up the Bitmap object
			GDI32.DeleteObject(hBitmap);

			return img;
		}

		public static Image CaptureMonitor()
		{
			return CaptureMonitor(0);
		}

        public static Image CaptureMonitor(int deviceIndex)
		{
            var i = 0;

			var result = CaptureMonitor((_) => i++ == deviceIndex);

			if (result == null)
			{
				throw new NoMonitorMatchException(deviceIndex + " is not the index of any installed monitor", nameof(deviceIndex));
			}

			return result;
		}

		public static Image CaptureMonitor(string deviceName)
		{
			var result = CaptureMonitor((currentDeviceName) => currentDeviceName.Equals(deviceName));

			if (result == null)
			{
				throw new NoMonitorMatchException("\"" + deviceName + "\" is not the name of any installed monitor", nameof(deviceName));
			}

			return result;
		}

        private static Image? CaptureMonitor(Func<string, bool> comparer)
		{
			var hdc = User32.GetDC(IntPtr.Zero);
			Image? image = null;

			User32.EnumDisplayMonitors(
				hdc,
				IntPtr.Zero,
				(IntPtr hMonitor, IntPtr hdcMonitor, ref RECT lprcMonitor, IntPtr _) =>
				{
					if (image != null)
					{
						return true;
					}

					var mi = new MONITORINFOEX();

					mi.size = (uint) Marshal.SizeOf(mi);
					User32.GetMonitorInfo(hMonitor, ref mi);

					if (comparer(mi.DeviceName))
					{
						image = CaptureWindowFromDC(hdcMonitor, PlainRectangle.From(lprcMonitor));
					}

					return true;
				},
				IntPtr.Zero
			);
			User32.ReleaseDC(IntPtr.Zero, hdc);

			return image;
		}

        public static List<MonitorInfo> GetMonitorInfos()
        {
            var monitorInfos = new List<MonitorInfo>();

			User32.EnumDisplayMonitors(
				IntPtr.Zero,
				IntPtr.Zero,
				(IntPtr hMonitor, IntPtr _, ref RECT __, IntPtr ___) =>
				{
					var mi = new MONITORINFOEX();

					mi.size = (uint) Marshal.SizeOf(mi);
					User32.GetMonitorInfo(hMonitor, ref mi);

					monitorInfos.Add(new MonitorInfo(
                        new PlainRectangle(
                            mi.Monitor.left,
                            mi.Monitor.top,
                            mi.Monitor.right,
                            mi.Monitor.bottom
                        ),
                        new PlainRectangle(
                            mi.WorkArea.left,
                            mi.WorkArea.top,
                            mi.WorkArea.right,
                            mi.WorkArea.bottom
                        ),
                        mi.DeviceName
                    ));

					return true;
				},
				IntPtr.Zero
			);

			return monitorInfos;
        }

		public static ImageFormat GetImageFormatFrom(string format)
		{
			return format.ToLower() switch
			{
				"bmp" => ImageFormat.Bmp,
				"emf" => ImageFormat.Emf,
				"exif" => ImageFormat.Exif,
				"gif" => ImageFormat.Gif,
				"icon" => ImageFormat.Icon,
				"jpg" or "jpeg" => ImageFormat.Jpeg,
				"png" => ImageFormat.Png,
				"tiff" => ImageFormat.Tiff,
				"wmf" => ImageFormat.Wmf,
				_ => throw new InvalidConfigurationException("\"" + format + "\" is not a valid image format", nameof(format)),
			};
		}

        public static byte[]? FlushImage(Image? image)
		{
			if (image == null) {
                throw new ArgumentNullException(nameof(image));
            }

			ImageFormat format = GetImageFormatFrom(Configuration.Format);

			if (Configuration.Save != null) {
				image.Save($"{Ctx.CurrentWorkingDirectory}/{Configuration.Save}", format);

				return null;
			}

			var memoryStream = new MemoryStream();

			image.Save(memoryStream, format);

			return memoryStream.ToArray();
		}

		private static IntPtr GetWindowHandleFrom(string title)
		{
			foreach (Process process in Process.GetProcesses())
			{
				if (process.MainWindowTitle.Contains(title))
				{
					return process.MainWindowHandle;
				}
			}
			return IntPtr.Zero;
		}

		private static float GetDpiScaling(IntPtr hwnd)
		{
			Shcore.GetDpiForMonitor(hwnd, 0, out uint dpiX, out uint _);

			return dpiX / 96;
		}

		private static class GDI32
		{
			public const int SRCCOPY = 0x00CC0020; // BitBlt dwRop parameter
			[DllImport("gdi32.dll")]
			public static extern bool BitBlt(IntPtr hObject, int nXDest, int nYDest,
			  int nWidth, int nHeight, IntPtr hObjectSource,
			  int nXSrc, int nYSrc, int dwRop);
			[DllImport("gdi32.dll")]
			public static extern IntPtr CreateCompatibleBitmap(IntPtr hDC, int nWidth,
			  int nHeight);
			[DllImport("gdi32.dll")]
			public static extern IntPtr CreateCompatibleDC(IntPtr hDC);
			[DllImport("gdi32.dll")]
			public static extern bool DeleteDC(IntPtr hDC);
			[DllImport("gdi32.dll")]
			public static extern bool DeleteObject(IntPtr hObject);
			[DllImport("gdi32.dll")]
			public static extern IntPtr SelectObject(IntPtr hDC, IntPtr hObject);
		}

		private static class User32
		{
			[DllImport("user32.dll")]
			public static extern IntPtr GetDC(IntPtr hWnd);

			[DllImport("user32.dll")]
			public static extern IntPtr GetDesktopWindow();

			[DllImport("user32.dll")]
			public static extern IntPtr GetWindowDC(IntPtr hWnd);

			[DllImport("user32.dll")]
			public static extern IntPtr ReleaseDC(IntPtr hWnd, IntPtr hDC);

			[DllImport("user32.dll")]
			public static extern IntPtr GetWindowRect(IntPtr hWnd, ref RECT rect);
			[DllImport("user32.dll")]
			public static extern IntPtr GetForegroundWindow();

			[DllImport("user32.dll", CharSet = CharSet.Unicode)]
			public static extern bool GetMonitorInfo(IntPtr hMonitor, ref MONITORINFOEX lpmi);

			public delegate bool MonitorEnumDelegate(IntPtr hMonitor, IntPtr hdcMonitor, ref RECT lprcMonitor, IntPtr dwData);

			[DllImport("user32.dll")]
			public static extern bool EnumDisplayMonitors(IntPtr hdc, IntPtr lprcClip, MonitorEnumDelegate lpfnEnum, IntPtr dwData);

			// https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow
			[DllImport( "user32.dll" )]
    		public static extern IntPtr MonitorFromWindow(IntPtr handle, int flags);

			[DllImport("user32.dll")]
			public static extern bool PrintWindow(IntPtr hwnd, IntPtr hDC, uint nFlags);
		}

		private static class Shcore
		{
			[DllImport("Shcore.dll")]
			public static extern IntPtr GetDpiForMonitor(IntPtr hMonitor, int dpiType, out uint dpiX, out uint dpiY);

            [DllImport("Shcore.dll")]
            public static extern IntPtr SetProcessDpiAwareness(int value);
        }
	}
}