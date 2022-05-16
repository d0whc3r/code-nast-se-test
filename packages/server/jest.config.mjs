import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('jest').Config.InitialOptions} */
export default {
  moduleFileExtensions: ['js', 'mjs'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)',
  ],
  testMatch: [
    '**/?(*.)(spec|test).?(m)js?(x)',
  ],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,mjs}',
    '!src/main.mjs',
    '!src/**/*.(test|spec).{js,mjs}',
  ],
  coverageDirectory: path.resolve(__dirname, '../../coverage/server'),
  setupFilesAfterEnv: ['./jest.setup.mjs'],
}
