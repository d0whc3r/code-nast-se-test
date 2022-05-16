import { describe, expect, it } from 'vitest'
import { act, fireEvent, renderWithPagination, screen } from '../../../test/utils'
import Pagination from './Pagination'

describe('Pagination', () => {
  const initialPagination = { page: 1, totalPages: 10 }
  it('should render', () => {
    const { baseElement } = renderWithPagination(<Pagination />, { initialPagination })
    expect(baseElement).toMatchSnapshot()
  })
  it('should first button must be disabled', () => {
    renderWithPagination(<Pagination />, { initialPagination })
    expect(screen.getByText(/First/)).toHaveAttribute('disabled')
  })
  it('should previous button must be disabled', () => {
    renderWithPagination(<Pagination />, { initialPagination })
    expect(screen.getByText(/Previous/)).toHaveAttribute('disabled')
  })
  it('should last button must be disabled', () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 10 } })
    expect(screen.getByText(/Last/)).toHaveAttribute('disabled')
  })
  it('should next button must be disabled', () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 10 } })
    expect(screen.getByText(/Next/)).toHaveAttribute('disabled')
  })
  it('should click first button', async () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 2 } })
    expect(screen.getByText(/First/)).not.toHaveAttribute('disabled')
    await act(() => {
      fireEvent.click(screen.getByText(/First/))
    })
    expect(screen.getByText(/First/)).toHaveAttribute('disabled')
  })
  it('should click next button', async () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 9 } })
    expect(screen.getByText(/Next/)).not.toHaveAttribute('disabled')
    await act(() => {
      fireEvent.click(screen.getByText(/Next/))
    })
    expect(screen.getByText(/Next/)).toHaveAttribute('disabled')
    expect(screen.getByText(/Last/)).toHaveAttribute('disabled')
  })
  it('should click previous button', async () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 2 } })
    expect(screen.getByText(/Previous/)).not.toHaveAttribute('disabled')
    await act(() => {
      fireEvent.click(screen.getByText(/Previous/))
    })
    expect(screen.getByText(/Previous/)).toHaveAttribute('disabled')
    expect(screen.getByText(/First/)).toHaveAttribute('disabled')
  })
  it('should click last button', async () => {
    renderWithPagination(<Pagination />, { initialPagination: { ...initialPagination, page: 2 } })
    expect(screen.getByText(/Last/)).not.toHaveAttribute('disabled')
    await act(() => {
      fireEvent.click(screen.getByText(/Last/))
    })
    expect(screen.getByText(/Last/)).toHaveAttribute('disabled')
    expect(screen.getByText(/Next/)).toHaveAttribute('disabled')
  })
})
