import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import EventCenterContainer from "../../../src/components/event/EventCenterContainer";
import events from "../../__mocks__/events";

const props = {
  match: { params: {} },
  events
};
const wrapper = mount(
  <Provider
    store={{
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return {
          userReducer: { user: { data: { id: 1 } } },
          eventCenterReducer: {
            eventCenter: {
              data: {
                name: "Garden Center",
                Events: events
              }
            }
          }
        };
      }
    }}
  >
    <EventCenterContainer {...props} />
  </Provider>
);

describe("Event Center Container Component ", () => {
  it("render component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
