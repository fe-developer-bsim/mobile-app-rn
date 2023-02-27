import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartDashboard from '../AlfacartDashboard.component';

describe('AlfacartDashboard component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<AlfacartDashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
