import React from 'react';
import renderer from 'react-test-renderer';
import SendAccounts from '../SendAccounts.component';

describe('SendAccounts component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SendAccounts accountNumber='1' label='x'/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
