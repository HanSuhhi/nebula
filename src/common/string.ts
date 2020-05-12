/**
 * @description 去花括号
 * @export
 * @param {string} input
 * @returns {string} 输入花括号
 */
export function splitBrackets(input: string | undefined): string {
  if (input?.indexOf("{{") && input.indexOf("}}")) {
    input = input
      .slice(input.indexOf("{{") + 2, input.lastIndexOf("}}"))
      .trim();
    return input;
  } else {
    return "";
  }
}
