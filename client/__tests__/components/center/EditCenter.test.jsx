import React from "react";
import Router from "react-router-dom";
import { shallow } from "enzyme";
import Connected, { EditCenterForm } from "../../../src/components/center/EditCenter";
import { centers } from "../../__mocks__/centers";

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {

    const store = mockStore({ centers: {}, fetchCenter: jest.fn() });
    const wrapper = shallow(<Connected store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});

const props = {
  fetchCenter: jest.fn(() => {})
};
const wrapper = shallow(<EditCenterForm {...props} />);


describe("Edit Component ", () => {
  it("should render component", () => {
    expect(wrapper.find(".header-section").text()).toEqual("Center List");
  });
});
