import React from "react";
import renderer from "react-test-renderer";
import Main from "./Main";

const data = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

it(`<Main/> should render place`, () => {
  const tree = renderer.create(<Main data={data} />).toJSON();

  expect(tree).toMatchSnapshot();
});
