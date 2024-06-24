/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/?(*.)+(spec|test).(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@type/(.*)$': '<rootDir>/src/types/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
}
