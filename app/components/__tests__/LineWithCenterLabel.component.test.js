
import React from 'react';
import renderer from 'react-test-renderer';
import LineWithCenterLabel from '../LineWithCenterLabel.component';

describe('LineWithCenterLabel page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LineWithCenterLabel text='test'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
