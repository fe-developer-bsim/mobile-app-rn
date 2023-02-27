import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyUpgradeBenefit from '../EmoneyUpgradeBenefit.component';

describe('EmoneyUpgradeBenefit page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyUpgradeBenefit navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
