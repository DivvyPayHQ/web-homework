import { formatName, getAge } from '../user-utils'

describe('user utility tests', () => {
  it('gets the age of an older gentleman', () => {
    const age = getAge(new Date('1923-10-15'))
    expect(age).toEqual(97)
  })

  it ('formats a users name correctly', () => {
    const user = {
      firstName: 'Darth',
      lastName: 'Vader'
    }
    const name = formatName(user)
    expect(name).toEqual('Vader, Darth')
  })
})
