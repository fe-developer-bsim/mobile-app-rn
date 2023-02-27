import React from 'react';
import renderer from 'react-test-renderer';
import MSIGdetailInfo from '../MSIGdetailInfo.component';

describe('MSIGdetailInfo component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MSIGdetailInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
