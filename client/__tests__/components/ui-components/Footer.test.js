import React from 'react'
import Footer from '../../../src/components/ui-components/Footer'

describe('Footer Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = renderer.create(<Footer />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
})