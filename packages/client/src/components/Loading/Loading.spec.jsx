import { describe, expect, it } from 'vitest'
import { render } from '../../../test/utils'
import Loading from './Loading'

describe('Loading', () => {
  it('should render', () => {
    const { baseElement } = render(<Loading />)
    expect(baseElement).toMatchSnapshot()
  })
})
