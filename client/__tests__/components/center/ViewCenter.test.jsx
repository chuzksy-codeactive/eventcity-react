import React from "react";
import Router from "react-router-dom";
import { shallow } from "enzyme";
import { ViewCenter } from "../../../src/components/center/ViewCenter";
import { centers } from "../../__mocks__/centers";

const props = {
  fetchCenter: () => {},
  searchCenterPerPage: jest.fn(),
  centerListReducer: {
    centers: []
  }
};

const wrapper = shallow(<ViewCenter {...props} />);

describe("ViewCenter Component ", () => {
  // it("render component.", () => {
  //   expect(wrapper.exists()).toBe(true);
  //   expect(wrapper.find("h1").text()).toEqual(
  //     "Explore our centers and make a choice"
  //   );
  // });

  // it("renders center cards", () => {
  //   const centerCard = wrapper.find(".center-cards");
  //   expect(centerCard.length).toEqual(2);
  //   expect(
  //     centerCard
  //       .first()
  //       .find("h4")
  //       .text()
  //   ).toEqual("Royal Gate");
  // });

  // it("should be able to search center", () => {
  //   const searchInputField = wrapper.find("#search-input");
  //   searchInputField.simulate("change", { target: { value: "Royal" } });
  // });

  it("renders no center", () => {
    expect(wrapper).toMatchSnapshot();
    
  });
});
