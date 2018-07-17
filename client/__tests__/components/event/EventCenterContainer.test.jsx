import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import EventCenterPage from "../../../src/components/event/EventCenterContainer";
import events from "../../__mocks__/events";

const props = {
  match: { params: {} },
  events
};

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {

    const store = mockStore({ 
      fetchEventCenter: jest.fn(),
      createEvent: jest.fn(),
      resetCenterEvent: jest.fn(),
      userReducer: {
        user: {
          data: []
        }
      }
     });
    const wrapper = shallow(<EventCenterPage store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});

