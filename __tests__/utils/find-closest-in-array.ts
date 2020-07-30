import findClosestInArray from "@utils/find-closest-in-array";

describe("Utils: Find Closest In Array", () => {
  const arr = Array.from(Array(10).keys());

  test("Should return correct value when needle is integer", () => {
    // when needle is equal to one of array values
    expect(findClosestInArray(arr, 3)).toBe(3);
    expect(findClosestInArray(arr, 9)).toBe(9);
  });

  test("Should return correct value when needle is float", () => {
    // when needle is very close to one of array values
    expect(findClosestInArray(arr, 5.9)).toBe(6);
    expect(findClosestInArray(arr, 4.2)).toBe(4);

    // when needle has ambiguous close value
    expect(findClosestInArray(arr, 2.5)).toBe(2);
    expect(findClosestInArray(arr, 2.500001)).toBe(3);
  });

  test("Should return closest value when needle if out of array values", () => {
    expect(findClosestInArray(arr, -123981)).toBe(0);
    expect(findClosestInArray(arr, 75389434)).toBe(9);
  });
});
