import React from "react";
import Router from "react-router-dom";
import { shallow } from "enzyme";
import {
  CenterForm,
  validate
} from "../../../src/components/center/CenterForm";
import { centers } from "../../__mocks__/centers";

const props = {
  match: { params: {} },
  history: { push: () => {} },
  createCenter: jest.fn(() => {}),
  load: () => {},
  handleSubmit: fn => {
    fn();
  },
  center: {},
  centers: {}
};

const wrapper = shallow(<CenterForm {...props} />);

describe("CenterForm Component ", () => {
  it("render component.", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#name").exists()).toBe(true);
    expect(wrapper.find("#capacity").exists()).toBe(true);
    expect(wrapper.find("#location").exists()).toBe(true);
    expect(wrapper.find("#price").exists()).toBe(true);
    expect(wrapper.find("#facilities").exists()).toBe(true);
    expect(wrapper.find("#type").exists()).toBe(true);

    wrapper
      .find(".btn")
      .first()
      .simulate("click");

    expect(props.createCenter).toHaveBeenCalled();
  });

  it("onDrop", () => {
    const wrapper = shallow(<CenterForm {...props} />);
    const instance = wrapper.instance();
    instance.onDrop([{ size: 2000 }, {}]);
  });
  it("form field must be valid", () => {
    const invalidFields = validate({
      name: "",
      type: "",
      capacity: "",
      location: ""
    });
    expect(invalidFields).toEqual({
      capacity: "Capacity is required",
      facilities: "facilities are required",
      location: "Center location is required",
      name: "center name is required",
      price: "Center amount is required",
      type: "Select a center type"
    });
    const validFields = validate(centers[0]);
    expect(validFields).toEqual(false);
  });
});
