import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationPAComponent from '../ConfirmationPA.component';

describe('ConfirmationPA component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ConfirmationPAComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
