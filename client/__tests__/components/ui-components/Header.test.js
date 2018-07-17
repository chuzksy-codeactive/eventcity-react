import React from 'react'
import Connected, { Header } from '../../../src/components/ui-components/Header'

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    const store = mockStore({ 
      user: {user: { data: [] }}, 
      auth: { isAdmin: false }, 
      logout: jest.fn() 
    });
    const wrapper = shallow(<Connected store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});

describe('Header Component test', () => {
  const props = {
    user: {
      user: { data: []}
    },
    auth: {
      isAdmin: false
    },
    logout: jest.fn()
  }
  const wrapper = shallow(<Header {...props}/>)
  it('It should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('It should render the component without error', () => {
    wrapper.setProps({
      ...wrapper.props, 
      auth: {
        isAdmin: true
      }
    })
    expect(wrapper.find('#add-center').length).toEqual(1);
  });
})