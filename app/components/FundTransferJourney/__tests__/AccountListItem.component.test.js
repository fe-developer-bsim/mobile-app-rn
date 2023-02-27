import React from 'react';
import renderer from 'react-test-renderer';
import AccountListItem from '../AccountListItem.component';

describe('AccountListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AccountListItem accountNumber={'12'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
