using System.Collections.Generic;
namespace SS
{
	// mirrors the TS object
	public class PlainRectangle
	{
		public int left;
		public int top;
		public int right;
		public int bottom;

		public PlainRectangle(int left, int top, int right, int bottom)
		{
			this.left = left;
			this.top = top;
			this.right = right;
			this.bottom = bottom;
		}

		public int GetWidth()
		{
			return right - left;
		}

		public int GetHeight()
		{
			return bottom - top;
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
				-rect.left,
				-rect.top,
				-rect.right,
				-rect.bottom
			);
		}

		public static PlainRectangle operator -(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.left - rect2.left,
				rect1.top - rect2.top,
				rect1.right - rect2.right,
				rect1.bottom - rect2.bottom
			);
		}

		public static PlainRectangle operator -(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.left - number),
				(int) (rect.top - number),
				(int) (rect.right - number),
				(int) (rect.bottom - number)
			);
		}

		public static PlainRectangle operator +(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.left + rect2.left,
				rect1.top + rect2.top,
				rect1.right + rect2.right,
				rect1.bottom + rect2.bottom
			);
		}

		public static PlainRectangle operator +(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.left + number),
				(int) (rect.top + number),
				(int) (rect.right + number),
				(int) (rect.bottom + number)
			);
		}

		public static PlainRectangle operator *(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.left * rect2.left,
				rect1.top * rect2.top,
				rect1.right * rect2.right,
				rect1.bottom * rect2.bottom
			);
		}

		public static PlainRectangle operator *(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.left * number),
				(int) (rect.top * number),
				(int) (rect.right * number),
				(int) (rect.bottom * number)
			);
		}

		public static PlainRectangle operator /(PlainRectangle rect1, PlainRectangle rect2)
		{
			return new PlainRectangle(
				rect1.left / rect2.left,
				rect1.top / rect2.top,
				rect1.right / rect2.right,
				rect1.bottom / rect2.bottom
			);
		}

		public static PlainRectangle operator /(PlainRectangle rect, float number)
		{
			return new PlainRectangle(
				(int) (rect.left / number),
				(int) (rect.top / number),
				(int) (rect.right / number),
				(int) (rect.bottom / number)
			);
		}
	}
}