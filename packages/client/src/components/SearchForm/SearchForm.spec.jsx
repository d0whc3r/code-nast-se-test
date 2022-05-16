import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '../../../test/utils'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  it('should render', () => {
    const { baseElement } = render(<SearchForm />)
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
  it('should search', async () => {
    const searchSpy = vi.fn()
    render(<SearchForm onSearch={searchSpy} />)
    await act(() => {
      fireEvent.click(screen.getByText('Search'))
    })
    expect(searchSpy).toHaveBeenCalledTimes(1)
    expect(searchSpy).toHaveBeenCalledWith({ topic: '', from: '', to: '' })
  })
})
