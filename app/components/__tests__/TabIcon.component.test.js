
import React from 'react';
import renderer from 'react-test-renderer';
import TabIcon from '../TabIcon.component';

describe('TabIcon page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TabIcon name='camera' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
