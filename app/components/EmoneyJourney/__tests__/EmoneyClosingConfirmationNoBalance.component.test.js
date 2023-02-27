import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyClosingConfirmationNoBalance from '../EmoneyClosingConfirmationNoBalance.component';

describe('EmoneyClosingConfirmationNoBalance page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyClosingConfirmationNoBalance navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
