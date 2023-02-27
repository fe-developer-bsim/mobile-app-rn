import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyUpgradeSuccessScreen from '../EmoneyUpgradeSuccessScreen.component';

describe('EmoneyUpgradeSuccessScreen page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyUpgradeSuccessScreen navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
