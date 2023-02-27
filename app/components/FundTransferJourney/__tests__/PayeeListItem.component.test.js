import React from 'react';
import renderer from 'react-test-renderer';
import PayeeListItem from '../PayeeListItem.component';

describe('PayeeListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <PayeeListItem accountNumber='1' label='x'/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
