import React from "react";
import renderer from "react-test-renderer";
import {LocationListItem} from "./location-item.jsx";
import {citiesMock} from "../../mocks/offers_for_test";

it(`Should LocationListItem render correctly`, () => {
  const tree = renderer
    .create(
        <LocationListItem
          activeCity={citiesMock[0]}
          city={citiesMock[0]}
          handleCityClick={()=>{}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
