import React from 'react';
import renderer from 'react-test-renderer';
import WebViewCreateSign from '../WebViewCreateSign.component';

describe('WebViewCreateSign component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <WebViewCreateSign/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
