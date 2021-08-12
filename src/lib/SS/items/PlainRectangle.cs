using System;
using System.Collections.Generic;
namespace SS
{
	public class PlainRectangle
	{
		public int Left;
		public int Top;
		public int Right;
		public int Bottom;
		public int Width { get => Right - Left; }
		public int Height { get => Bottom - Top; }

		public PlainRectangle(int left, int top, int right, int bottom)
		{
			Left = left;
			Top = top;
			Right = right;
			Bottom = bottom;
		}

		public static PlainRectangle From(IDictionary<string, object> dict)
		{
			return new PlainRectangle(
				(int) dict["left"],
				(int) dict["top"],
				(int) dict["right"],
				(int) dict["bottom"]
			);
		}

		public static PlainRectangle From(RECT rect)
		{
			return new PlainRectangle(
				rect.left,
				rect.top,
				rect.right,
				rect.bottom
			);
		}

		public static PlainRectangle operator +(PlainRectangle rect)
		{
			return rect;
		}

		public static PlainRectangle operator -(PlainRectangle rect)
		{
			return new PlainRectangle(
				-rect.Left,
				-rect.Top,
				-rect.Right,
				-rect.Bottom
			);
		}

		public static PlainRectangle operator -(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.Left - rect2.Left,
				rect1.Top - rect2.Top,
				rect1.Right - rect2.Right,
				rect1.Bottom - rect2.Bottom
			);
		}

		public static PlainRectangle operator -(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.Left - number),
				(int) (rect.Top - number),
				(int) (rect.Right - number),
				(int) (rect.Bottom - number)
			);
		}

		public static PlainRectangle operator +(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.Left + rect2.Left,
				rect1.Top + rect2.Top,
				rect1.Right + rect2.Right,
				rect1.Bottom + rect2.Bottom
			);
		}

		public static PlainRectangle operator +(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.Left + number),
				(int) (rect.Top + number),
				(int) (rect.Right + number),
				(int) (rect.Bottom + number)
			);
		}

		public static PlainRectangle operator *(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.Left * rect2.Left,
				rect1.Top * rect2.Top,
				rect1.Right * rect2.Right,
				rect1.Bottom * rect2.Bottom
			);
		}

		public static PlainRectangle operator *(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.Left * number),
				(int) (rect.Top * number),
				(int) (rect.Right * number),
				(int) (rect.Bottom * number)
			);
		}

		public static PlainRectangle operator /(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.Left / rect2.Left,
				rect1.Top / rect2.Top,
				rect1.Right / rect2.Right,
				rect1.Bottom / rect2.Bottom
			);
		}

		public static PlainRectangle operator /(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.Left / number),
				(int) (rect.Top / number),
				(int) (rect.Right / number),
				(int) (rect.Bottom / number)
			);
		}
	}
}