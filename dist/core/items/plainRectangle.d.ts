/**
 * Contains properties to form a plain rectangle.
 */
export interface PlainRectangle {
    /**
     * The left edge of the rectangle.
     * @note **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.
     */
    left: number;
    /**
     * The top edge of the rectangle.
     * @note **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.
     */
    top: number;
    /**
     * The right edge of the rectangle.
     * @note **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.
     */
    right: number;
    /**
     * The bottom edge of the rectangle.
     * @note **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.
     */
    bottom: number;
}
