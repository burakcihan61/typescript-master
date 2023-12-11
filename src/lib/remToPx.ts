/**
 * Converts a value from rem units to pixels.
 *
 * @param remValue - The value in rem units that needs to be converted to pixels.
 * @returns The equivalent value of `remValue` in pixels.
 *
 * @example
 * const remValue = 2;
 * const pxValue = remToPx(remValue);
 * console.log(pxValue); // Output: 32
 */
export function remToPx(remValue: number) {
  let rootFontSize =
    typeof window === "undefined"
      ? 16
      : parseFloat(window.getComputedStyle(document.documentElement).fontSize)

  return remValue * rootFontSize
}
