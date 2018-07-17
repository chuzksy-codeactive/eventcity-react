import React from 'react'
import CoverInfo from '../../../src/components/ui-components/CoverInfo'

describe('CoverInfo Component test', () => {
  it('It should render the component without error', () => {
    const wrapper = shallow(<CoverInfo />);
    expect(wrapper).toMatchSnapshot();
  });
})