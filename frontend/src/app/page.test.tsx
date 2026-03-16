import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
  })
})
