module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/api/**/*.(test|spec).(ts|tsx|js)',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],
    clearMocks: true
}