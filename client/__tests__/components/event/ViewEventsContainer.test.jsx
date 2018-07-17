import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import ViewEventsContainer from "../../../src/components/event/ViewEventsContainer";
import events from "../../__mocks__/events";

const props = {
  match: { params: {} },
  history: { push: () => {} }
};
const wrapper = mount(
  <Provider
    store={{
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return {
          userReducer: { user: { data: { id: 1 } } },
          eventReducer: { events: events }
        };
      }
    }}
  >
    <ViewEventsContainer {...props} />
  </Provider>
);

describe("View Events Container Component ", () => {
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
