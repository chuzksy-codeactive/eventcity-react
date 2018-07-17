import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import EditEventList from "../../../src/components/event/EditEventList";
import events from "../../__mocks__/events";

const DOMClassList = listObj => {
  return Object.keys(listObj).map(key => listObj[key]);
};

const props = {
  eventsByUserId: { loading: true },
  deleteEventById: jest.fn(() => {}),
  fetchEventById: jest.fn(() => {}),
  reset: jest.fn(() => {}),
  events
};
const wrapper = mount(
  <Provider
    store={{
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return {
          centerListReducer: {},
          userReducer: { user: { data: {} } },
          updateEventReducer: {}
        };
      }
    }}
  >
    <EditEventList {...props} />
  </Provider>
);

describe("Edit Event List Component ", () => {
  it("render component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("edit event", () => {
    const editBtn = wrapper.find(".ion-edit").first();
    editBtn.simulate("click");
    expect(props.reset).toHaveBeenCalled();
  });

  it("should open delete modal", () => {
    const modalDeleteBtn = wrapper.find(".ion-trash-a").first();
    modalDeleteBtn.simulate("click");

    const deleteBtn = wrapper.find("#close-button").first();
    deleteBtn.simulate("click");

    expect(props.fetchEventById).toHaveBeenCalled();
    expect(props.deleteEventById).toHaveBeenCalled();
  });

  it("fetch center on modal close", () => {
    const closeModalBtn = wrapper.find(".close");
    closeModalBtn.simulate("click");
    expect(props.fetchEventById).toHaveBeenCalled();
  });
});
