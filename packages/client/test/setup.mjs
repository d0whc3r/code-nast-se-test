import '@testing-library/jest-dom'
import { afterAll, beforeAll, vi } from 'vitest'

const noop = () => {
}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
require('dotenv').config({ path: '.env.test' })

let mockDate
beforeAll(() => {
  mockDate = vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('2020-04-15, 14:46:50')
})
afterAll(() => {
  mockDate.mockRestore()
})
