import React from 'react';
import renderer from 'react-test-renderer';
import CompletedOnboarding from '../MigrateError.component';

describe('CompletedOnboarding component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CompletedOnboarding />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
