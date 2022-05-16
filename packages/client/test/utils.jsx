import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, expect } from 'vitest'
import { PaginationProvider } from '../src/context/Pagination.context'

beforeEach(() => {
  expect.hasAssertions()
})

afterEach(() => {
  cleanup()
})

const customRender = (ui, { initialPagination, ...options } = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <PaginationProvider initialState={initialPagination}>{children}</PaginationProvider>
    ),
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as renderWithPagination }
