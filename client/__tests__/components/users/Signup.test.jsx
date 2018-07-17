import React from "react";
import { shallow } from "enzyme";
import { Signup, validate } from "../../../src/components/users/Signup";

const props = {
  match: { params: {} },
  history: { push: () => {} },
  handleSubmit: () => {},
  user: {},
  submitting: false,
  userSignUp: () => {}
};

const wrapper = shallow(<Signup {...props} />);

describe("CenterForm Component ", () => {
  it("render component.", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".form-title h4").text()).toEqual(
      "Please Sign up here"
    );
    expect(wrapper.find("#username").exists()).toBe(true);
    expect(wrapper.find("#email").exists()).toBe(true);
    expect(wrapper.find("#firstname").exists()).toBe(true);
    expect(wrapper.find("#lastname").exists()).toBe(true);
    expect(wrapper.find("#password").exists()).toBe(true);
    wrapper.instance().onSubmitForm();
  });
});
