import React from "react";
import { shallow } from "enzyme";
import SignUpForm from "../../../src/components/users/SignUpFormContainer";


describe('Connected Component', () => {
  it('should render the connected component with all props', () => {

    const store = mockStore({ 
      userReducer: {},
      authReducer: {},
      userSignUp: jest.fn()
     });
    const wrapper = shallow(<SignUpForm store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
