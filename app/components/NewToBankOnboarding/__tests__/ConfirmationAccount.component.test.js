import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationAccount from '../ConfirmationAccount.component';

describe('Confirmation Account component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ConfirmationAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
