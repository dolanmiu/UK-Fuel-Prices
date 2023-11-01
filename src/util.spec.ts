import { describe, expect, it } from "vitest";
import { applyFunctionToRecordValues, normalizeNumber } from "./util";

describe("normalizeNumber", () => {
  it("should not normalize", () => {
    expect(normalizeNumber(155.67)).toEqual(155.67);
  });

  it("should normalize", () => {
    expect(normalizeNumber(1)).toEqual(100);
    expect(normalizeNumber(1.5567)).toEqual(155.67);
  });
});

describe("applyFunctionToRecordValues", () => {
  it("should not normalize", () => {
    expect(
      applyFunctionToRecordValues(
        {
          B7: 165.9,
          SDV: 181.9,
          E10: 155.9,
          E5: 169.9,
        },
        normalizeNumber
      )
    ).toEqual({
      B7: 165.9,
      SDV: 181.9,
      E10: 155.9,
      E5: 169.9,
    });
  });

  it("should normalize", () => {
    expect(
      applyFunctionToRecordValues(
        { E5: 1.659, E10: 1.469, B7: 1.559, SDV: 1.739 },
        normalizeNumber
      )
    ).toEqual({
      B7: 155.9,
      E10: 146.9,
      E5: 165.9,
      SDV: 173.9,
    });
  });
});
