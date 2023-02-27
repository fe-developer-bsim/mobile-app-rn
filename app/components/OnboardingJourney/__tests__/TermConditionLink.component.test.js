import React from 'react';
import renderer from 'react-test-renderer';
import TermConditionLink from '../TermConditionLink.component';

describe('TermConditionLink component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TermConditionLink />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
