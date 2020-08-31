/**
 * @description - @coco-platform/init-cli generated template
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/prefer-default-export */
export function sum(...variables: number[]): number {
  const numbers = Array.from(variables);

  return numbers.reduce((acc, curr) => acc + curr, 0);
}
