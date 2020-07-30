import calcPercentage from "@utils/calc-percentage";

describe("Utils: Calc Percentage", () => {
  test("Should return correct percentage", () => {
    expect(calcPercentage(11, 100)).toBe(11);
    expect(calcPercentage(42, 84)).toBe(50);
  });
});
