import React from 'react';
import renderer from 'react-test-renderer';
import OverlaySpinner from '../FinalizePaydayLoan.component';

describe('Payloan component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OverlaySpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
