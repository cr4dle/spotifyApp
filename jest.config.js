module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  coverageThreshold: {
    global: {
      branches: 14.29,
      functinos: 14.1,
      lines: 12.76,
      statements: 12.9,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.vue"],
  testPathIgnorePatterns: ["build"],
};
