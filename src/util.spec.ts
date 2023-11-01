import { describe, expect, it } from "vitest";
import { normalizeNumber } from "./util";

describe("normalizeNumber", () => {
  it("should normalize", () => {
    expect(normalizeNumber(100)).toEqual(1);
    expect(normalizeNumber(155.67)).toEqual(1.5567);
  });

  it("should not normalize", () => {
    expect(normalizeNumber(1.5567)).toEqual(1.5567);
  });
});
