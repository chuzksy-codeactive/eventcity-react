import React from 'react'
import CoverPage from '../../../src/components/ui-components/CoverPage'

describe('CoverPage Component test', () => {
  
  it('It should render the component without error', () => {
    const wrapper = shallow(<CoverPage />)
    expect(wrapper).toMatchSnapshot();
  });
})