import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyUpgradeFullBank from '../EmoneyUpgradeFullBank.component';

describe('EmoneyUpgradeFullBank page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyUpgradeFullBank  navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
