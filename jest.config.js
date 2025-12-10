/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Look for test files in a __tests__ directory or files ending in .test.ts
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  // Mapping to transform TypeScript files using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Optionally, you can ignore the compiled 'dist' folder
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};