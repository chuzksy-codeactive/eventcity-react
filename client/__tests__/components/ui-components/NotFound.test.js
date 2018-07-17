import React from 'react'
import NotFound from '../../../src/components/ui-components/NotFound'

describe('NotFound Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = renderer.create(<NotFound />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
})