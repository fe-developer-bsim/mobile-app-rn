import React from 'react';
import renderer from 'react-test-renderer';
import RecurringComponent from '../ConfirmationEmail.component';

describe('emoney component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RecurringComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
