
import React from 'react';
import renderer from 'react-test-renderer';
import BackgroundCard from '../BackgroundCard.component';

describe('BackgroundCard page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BackgroundCard backgroundImage={1}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
