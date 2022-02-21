import { AUTHENTICATION_KEY, STATE_KEY } from "@/constants";
import { localStorage } from "@/utils";

var mock = (() => {
  let storage: { [key:string]: string } = {};

  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || "";
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    get length(): number {
      return Object.keys(storage).length;
    },
    key: function (i: number): string | null {
      const keys: string[] = Object.keys(storage);
      return keys[i] || null;
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mock,
});

describe("localStorage", () => {
  it("get nothing", () => {
    const storage = localStorage.get("something");

    expect(storage).toStrictEqual(null);
  });

  it("get value", () => {
    const key = "someKey";
    const value = "someValue";
    window.localStorage.setItem(key, value);

    const storage = localStorage.get(key);

    expect(storage).toStrictEqual(value);
  });

  it("set", () => {
    const key = "someKey";
    const value = "someValue";

    localStorage.set(key, value);

    const storage = window.localStorage.getItem(key);

    expect(storage).toStrictEqual(value);
  });

  it("remove", () => {
    const key = "someKey";
    const value = "someValue";
    window.localStorage.setItem(key, value);

    localStorage.remove(key);

    const storage = window.localStorage.getItem(key);

    expect(storage).toStrictEqual(null);
  });

  it("clear", () => {
    window.localStorage.setItem(STATE_KEY, "value");
    window.localStorage.setItem(AUTHENTICATION_KEY, "value");

    localStorage.clear();

    expect(window.localStorage.length).toStrictEqual(0);
  });
});
