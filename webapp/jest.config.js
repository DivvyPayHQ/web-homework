module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    './testSetup.js'
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ]
}
