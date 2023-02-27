import React from 'react';
import renderer from 'react-test-renderer';
import AccountListBIFast from '../AccountListBIFast.component';

describe('AccountListBIFast component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AccountListBIFast accountNumber={'12'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
