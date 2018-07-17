import React from "react";
import { shallow } from "enzyme";
import { EditEvent } from "../../../src/components/event/EditEvent";
import { centers } from "../../__mocks__/centers";

const props = {
  eventsByUserId: { loading: true },
  fetchEventById: jest.fn(() => {})
};
const wrapper = shallow(<EditEvent {...props} />);

describe("Edit Event Component ", () => {
  it("render component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
