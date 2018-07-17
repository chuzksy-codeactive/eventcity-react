import React from 'react'
import Connected, { Modal } from '../../../src/components/ui-components/Modal'

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    const store = mockStore({
      centerReducer: {
        center: {
          message: 'message'
        }
      }
    })

    const wrapper = shallow(<Connected store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});

describe('Modal Component test', () => {
  const props = {
    message: 'message'
  }
  const wrapper = shallow(<Modal {...props}/>)
  it('It should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
})