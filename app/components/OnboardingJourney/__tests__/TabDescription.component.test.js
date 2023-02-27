import React from 'react';
import renderer from 'react-test-renderer';
import TabDescription from '../TabDescription.component';

describe('TabDescription component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TabDescription />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
