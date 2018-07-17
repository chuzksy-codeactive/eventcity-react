import React from "react";
import Router from "react-router-dom";
import { mount } from "enzyme";
import { ViewCenter } from "../../../src/components/center/ViewCenter";
import { centers } from "../../__mocks__/centers";

const props = {
  fetchCenter: () => {},
  centers
};

const wrapper = mount(<ViewCenter {...props} />);

describe("ViewCenter Component ", () => {
  it("render component.", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h1").text()).toEqual(
      "Explore our centers and make a choice"
    );
  });

  it("renders center cards", () => {
    const centerCard = wrapper.find(".center-cards");
    expect(centerCard.length).toEqual(2);
    expect(
      centerCard
        .first()
        .find("h4")
        .text()
    ).toEqual("Royal Gate");
  });

  it("should be able to search center", () => {
    const searchInputField = wrapper.find("#search-input");
    searchInputField.simulate("change", { target: { value: "Royal" } });
  });

  it("renders no center", () => {
    const wrapper = mount(<ViewCenter {...{ ...props, centers: [] }} />);
    expect(wrapper.find(".no-centers-found").text()).toEqual(
      "No available center"
    );
  });
});
