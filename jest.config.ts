import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
};

export default config;
