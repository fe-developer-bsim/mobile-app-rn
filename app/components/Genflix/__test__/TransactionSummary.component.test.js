import React from 'react';
import renderer from 'react-test-renderer';
import Component from '../TransactionSummary.component';

describe('Customizable Transaction Summary component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Component/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
