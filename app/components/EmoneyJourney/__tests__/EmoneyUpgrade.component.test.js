import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyUpgrade from '../EmoneyUpgrade.component';

describe('EmoneyUpgrade page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyUpgrade  navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
