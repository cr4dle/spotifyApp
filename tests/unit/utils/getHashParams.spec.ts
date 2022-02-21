import { getHashParams } from "@/utils";

describe("getHashParams", () => {
  it("with default hash", () => {
    const params = getHashParams();

    expect(params).toStrictEqual({});
  });

  it("with specific hash", () => {
    const access_token = "RandomTokenHere";
    const expires_in = 10;
    const state = "state";
    const token_type = "bearer";
    window.location.hash = `#access_token=${access_token}&expires_in=${expires_in}&state=${state}&token_type=${token_type}`;

    const randomValue = getHashParams();

    expect(randomValue.access_token).toStrictEqual(access_token);
    expect(randomValue.expires_in).toStrictEqual(expires_in.toString());
    expect(randomValue.state).toStrictEqual(state);
    expect(randomValue.token_type).toStrictEqual(token_type);
  });
});
