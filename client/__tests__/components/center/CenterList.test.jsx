import React from "react";
import ReactDOM from "react-dom";
import CenterList from "../../../src/components/center/CenterList";
import renderer from "react-test-renderer";

describe("Center List Component ", () => {
  it("render component", () => {
    const tree = renderer.create(<CenterList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
