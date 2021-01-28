import { render } from '@testing-library/react'
import { InputForm } from './input-form.js'

describe('Input Form', () => {
  let container, getByText
  beforeEach(() => {
    let result = render(<InputForm />)
    container = result.container
    getByText = result.getByText
  })

  it('should have user id field', () => {
    expect(getByText(/user\ id/i)).toBeInTheDocument()
  })

  it('should have merchant id field', () => {
    expect(getByText(/merchant\ id/i)).toBeInTheDocument()
  })

  it('should have description field', () => {
    expect(getByText(/description/i)).toBeInTheDocument()
  })

  it('should have debit field', () => {
    expect(getByText(/debit/i)).toBeInTheDocument()
  })

  it('should have credit field', () => {
    expect(getByText(/credit/i)).toBeInTheDocument()
  })

  it('should have amount field', () => {
    expect(getByText(/amount/i)).toBeInTheDocument()
  })

})