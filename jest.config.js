module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@Routes/(.*)": "<rootDir>/src/routes/$1",
    "@Controllers/(.*)": "<rootDir>/src/controllers/$1"
  }
};