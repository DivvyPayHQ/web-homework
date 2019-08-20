import { Home } from '.'
import { render } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'
import { MemoryRouter } from 'react-router-dom'

describe('<Home />', () => {
  it('renders each transaction', () => {
    jest.spyOn(apolloHooks, 'useQuery').mockReturnValue({ data: { transactions: [{ id: '123' }, { id: '456' }] } })

    const { getByText } = render(<MemoryRouter>
      <Home />
    </MemoryRouter>)

    expect(getByText('123'))
    expect(getByText('456'))
  })
})
