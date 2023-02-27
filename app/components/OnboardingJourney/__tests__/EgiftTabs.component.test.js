import React from 'react';
import renderer from 'react-test-renderer';
import EgiftTabs from '../EgiftTabs.component';

describe('EgiftTabs component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<EgiftTabs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});