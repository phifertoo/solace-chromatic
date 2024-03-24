// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Specify the test environment
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "babel-jest", // This line ensures Babel is used
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
