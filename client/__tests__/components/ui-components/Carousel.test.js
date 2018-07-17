import React from 'react'
import Carousel from '../../../src/components/ui-components/Carousel'

describe('Carousel Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = renderer.create(<Carousel />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
})

