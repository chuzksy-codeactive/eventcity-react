import React from "react";
import { mount } from "enzyme";
import EventCardList from "../../../src/components/event/EventCardList";
import events from "../../__mocks__/events";

const DOMClassList = listObj => {
  return Object.keys(listObj).map(key => listObj[key]);
};

const props = {
  events: { events },
  history: { push: () => {} }
};
const wrapper = mount(<EventCardList {...props} />);

describe("Event Card List Component ", () => {
  it("render component", () => {
    expect(wrapper.exists()).toBe(true);
    const eventCard = wrapper.find(".event-card");
    expect(eventCard.length).toEqual(events.length);
    expect(
      eventCard
        .at(0)
        .find("h4")
        .text()
    ).toEqual("Get Together");
    expect(
      eventCard
        .at(1)
        .find("h4")
        .text()
    ).toEqual("Bash");
  });
});
