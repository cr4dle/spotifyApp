import { generateRandomString } from "@/utils";

describe("generateRandomString", () => {
  it("with default parameters", () => {
    const randomValue = generateRandomString();
    expect(randomValue.length).toBe(16);
  });

  it("with specific length", () => {
    const len = 2;

    const randomValue = generateRandomString(len);

    expect(randomValue.length).toBe(len);
  });
});
