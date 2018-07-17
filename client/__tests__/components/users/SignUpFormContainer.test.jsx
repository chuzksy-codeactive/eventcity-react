import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import SignUpFormContainer from "../../../src/components/users/SignUpFormContainer";

const props = {
  match: { params: {} },
  history: { push: () => {} },
  user: {}
};
const wrapper = mount(
  <Provider
    store={{
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return { userReducer: {} };
      }
    }}
  >
    <SignUpFormContainer {...props} />
  </Provider>
);

describe("Signup Form Container Component ", () => {
  it("render component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
