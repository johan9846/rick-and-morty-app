import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.(svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json', // <-- importante
    },
  },
};

export default config;
