// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

import { mswServer } from '@/mocks/mswServer'

// // Establish API mocking before all tests.
beforeAll(() => {
    mswServer.listen()
})

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
afterAll(() => {
    mswServer.close()
})

// // Clean up after the tests are finished.
afterEach(() => {
    mswServer.resetHandlers()
})
