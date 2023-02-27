import React from 'react';
import renderer from 'react-test-renderer';
import TopBanner from '../TopBanner.component';

describe('TopBanner component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TopBanner source={1}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
