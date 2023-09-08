import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    // // transform: {
    // //     '^.+\\.js?$': 'js-jest',
    // // },
    // // preset: 'js-jest',
    // testEnvironment: 'node',
    // testMatch: ['**/tests/**/*.test.js'],
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    // restoreMocks: true,
    // moduleFileExtensions: ['ts', 'json', 'jsx'],
    // coveragePathIgnorePatterns: [
    //     '<rootDir>/dist/',
    //     '<rootDir>/node_modules/',
    //     '<rootDir>/docs/',
    //     '<rootDir>/build/',
    //     '<rootDir>/coverage/',
    // ],
    // testPathIgnorePatterns: [
    //     '<rootDir>/dist/',
    //     '<rootDir>/node_modules/',
    //     '<rootDir>/docs/',
    //     '<rootDir>/build/',
    //     '<rootDir>/coverage/',
    // ],
    // collectCoverageFrom: ['src/**'],

    // setupFilesAfterEnv: ['./tests/bootstrap.ts']
};
export default config;
