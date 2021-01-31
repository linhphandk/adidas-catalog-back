module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@controller/(.*)": "<rootDir>/src/controller/$1"
  }
};