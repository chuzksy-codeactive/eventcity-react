import React from "react";
import Router from "react-router-dom";
import { shallow, mount } from "enzyme";
import { EditCenterList } from "../../../src/components/center/EditCenterList";
import { centers } from "../../__mocks__/centers";

const props = {
  fetchCenter: jest.fn(() => {}),
  centerList: { centers },
  deleteCenter: jest.fn(() => {}),
  center: centers[0]
};
const wrapper = shallow(<EditCenterList {...props} />);

const DOMClassList = listObj => {
  return Object.keys(listObj).map(key => listObj[key]);
};

describe("Edit Center List Component ", () => {

  it("render component centers and events", () => {
    expect(wrapper).toMatchSnapshot();
    const itemList = wrapper.find(".list-item");
    const eventItemDetails = wrapper.find(".event-item-details");
    expect(itemList.length).toEqual(centers.length);
    expect(eventItemDetails.length).toEqual(centers.length);
    expect(eventItemDetails.first().text()).toEqual("No event for this center");
  });
});
