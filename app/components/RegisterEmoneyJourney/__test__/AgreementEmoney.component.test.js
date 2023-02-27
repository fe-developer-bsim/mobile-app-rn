import React from 'react';
import renderer from 'react-test-renderer';
import RecurringComponent from '../AgreementEmoney.component';

describe('emoney component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<RecurringComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
