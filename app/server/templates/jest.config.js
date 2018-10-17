module.exports = {
  "testMatch": [ "**/__tests__/**/*.test.ts" ],
  "transform": { "^.+\\.tsx?$": "ts-jest" },
  "moduleFileExtensions": [ "ts", "tsx", "js", "jsx", "json", "node" ],
  "testEnvironment": "node",
  "setupTestFrameworkScriptFile": "<rootDir>/src/test/setupTest.ts"
}
