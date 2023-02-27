import React from 'react';
import renderer from 'react-test-renderer';
import CompletedOnboarding from '../MigrateIndex.component';

describe('CompletedOnboarding component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CompletedOnboarding />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
