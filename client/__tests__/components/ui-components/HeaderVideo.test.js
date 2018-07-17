import React from 'react'
import HeaderVideo from '../../../src/components/ui-components/HeaderVideo'

describe('HeaderVideo Component test', () => {
  const props = {
    history: {
      push: jest.fn()
    }
  }
  it('It should render the component without error', () => {
    const wrapper = shallow(<HeaderVideo {...props}/>)
    expect(wrapper).toMatchSnapshot();
  });
})