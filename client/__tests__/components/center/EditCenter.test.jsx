import React from "react";
import Router from "react-router-dom";
import { shallow } from "enzyme";
import { EditCenterForm } from "../../../src/components/center/EditCenter";
import { centers } from "../../__mocks__/centers";

const props = {
  fetchCenter: jest.fn(() => {})
};
const wrapper = shallow(<EditCenterForm {...props} />);

describe("Edit Component ", () => {
  it("should render component", () => {
    expect(wrapper.find(".header-section").text()).toEqual("Center List");
  });
});
