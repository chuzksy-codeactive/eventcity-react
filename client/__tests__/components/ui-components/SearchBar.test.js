import React from 'react'
import SearchBar from '../../../src/components/ui-components/SearchBar'

describe('SearchBar Component test', () => {
  const props = {
    onInputChange: jest.fn()
  }
  it('It should render the component without error', () => {
    const wrapper = renderer.create(<SearchBar {...props}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
})