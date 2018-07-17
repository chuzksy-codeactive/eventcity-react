import React from "react";
import Router from "react-router-dom";
import { mount } from "enzyme";
import { EditCenterList } from "../../../src/components/center/EditCenterList";
import { centers } from "../../__mocks__/centers";

const props = {
  fetchCenter: jest.fn(() => {}),
  centerList: { centers },
  deleteCenter: jest.fn(() => {}),
  center: centers[0]
};
const wrapper = mount(<EditCenterList {...props} />);

const DOMClassList = listObj => {
  return Object.keys(listObj).map(key => listObj[key]);
};

describe("Edit Center List Component ", () => {
  it("render component centers and events", () => {
    const itemList = wrapper.find(".list-item");
    const eventItemDetails = wrapper.find(".event-item-details");
    expect(itemList.length).toEqual(centers.length);
    expect(eventItemDetails.length).toEqual(centers.length);
    expect(eventItemDetails.first().text()).toEqual("No event for this center");
  });

  it("delete center from list", () => {
    const deleteBtn = wrapper.find("#close-button");
    deleteBtn.simulate("click");
    expect(props.deleteCenter).toHaveBeenCalled();
    const modelClasses = DOMClassList(wrapper.instance().modal.classList);
    expect(modelClasses.includes("opened")).toBe(true);
  });

  it("should hide modal", () => {
    const closeBtn = wrapper.find(".close");
    closeBtn.simulate("click");
    const modelClasses = DOMClassList(wrapper.instance().modal.classList);
    expect(modelClasses.includes("opened")).toBe(false);
  });

  it("open modal delete", () => {
    const trashBtn = wrapper.find(".ion-trash-a").first();
    trashBtn.simulate("click");
    const modelClasses = DOMClassList(wrapper.instance().modal.classList);
    expect(modelClasses.includes("opened")).toBe(true);
  });
});
