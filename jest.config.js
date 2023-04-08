/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/jest-html-report',
        filename: 'report.html',
        expand: true,
        openReport: false,
      },
    ],
  ],
  modulePaths: ['<rootDir>/node_modules/', '<rootDir>/node_modules/ts-jest'],
}
