import React from 'react';
import renderer from 'react-test-renderer';
import OverlaySpinner from '../AboutPayDayLoan.component';

describe('Payloan component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OverlaySpinner mockImageLocation={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
