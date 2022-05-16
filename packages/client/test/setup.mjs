import '@testing-library/jest-dom'

const noop = () => {
}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
require('dotenv').config({ path: '.env.test' })
