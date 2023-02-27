import React from 'react';
import renderer from 'react-test-renderer';
import FAQComponent from '../FAQ.component';

describe('FAQ component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FAQComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
