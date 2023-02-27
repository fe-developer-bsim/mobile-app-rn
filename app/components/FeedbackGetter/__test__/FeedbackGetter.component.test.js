import React from 'react';
import renderer from 'react-test-renderer';
import FeedbackGetter from '../FeedbackGetter.component';

describe('FeedbackGetter component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FeedbackGetter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
