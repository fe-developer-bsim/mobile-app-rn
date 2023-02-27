import React from 'react';
import renderer from 'react-test-renderer';
import PlanTravelComponent from '../PlanTravel.component';

describe('PlanTravel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <PlanTravelComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
