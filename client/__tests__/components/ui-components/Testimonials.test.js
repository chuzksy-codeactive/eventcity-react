import React from 'react'
import Testimonials from '../../../src/components/ui-components/Testimonials'

describe('Testimonials Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = renderer.create(<Testimonials />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
})