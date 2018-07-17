import React from 'react'
import Navbar from '../../../src/components/ui-components/Navbar'

describe('Navbar Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
})