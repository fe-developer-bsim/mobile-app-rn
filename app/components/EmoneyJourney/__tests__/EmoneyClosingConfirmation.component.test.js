import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyClosingConfirmation from '../EmoneyClosingConfirmation.component';

describe('EmoneyClosingConfirmation page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyClosingConfirmation navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
