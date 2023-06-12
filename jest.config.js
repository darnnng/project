import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['/node_modules/(?!node-fetch)/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(css|scss)$': 'jest-transform-css',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/src/**/**/tests/**/*.ts?(x)', '**/src/**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@src/(.*)$': path.resolve(dirname, 'src/$1'),
    '^@widgets/(.*)$': path.resolve(dirname, 'src/widgets/$1'),
    '^@shared/(.*)$': path.resolve(dirname, 'src/shared/$1'),
    '^@pages/(.*)$': path.resolve(dirname, 'src/pages/$1'),
    '^@features/(.*)$': path.resolve(dirname, 'src/features/$1'),
    '^@entities/(.*)$': path.resolve(dirname, 'src/entities/$1'),
    '^@public/(.*)$': path.resolve(dirname, 'public/$1'),
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
