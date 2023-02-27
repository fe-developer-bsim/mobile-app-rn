import React from 'react';
import renderer from 'react-test-renderer';

import EmallAccounts from '../EmallAccounts.component';

describe('EmallAccounts component', () => {
  it('EmallAccounts: renders correctly', () => {
    const tree = renderer.create(<EmallAccounts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
