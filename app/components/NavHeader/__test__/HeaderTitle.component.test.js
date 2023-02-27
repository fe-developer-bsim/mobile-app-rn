import React from 'react';
import renderer from 'react-test-renderer';
import HeaderTitle from '../HeaderTitle.component';

describe('HeaderTitle component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HeaderTitle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
