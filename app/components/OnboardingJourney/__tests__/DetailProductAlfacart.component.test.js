import React from 'react';
import renderer from 'react-test-renderer';
import DetailProductAlfacart from '../DetailProductAlfacart.component';

describe('DetailProductAlfacart component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<DetailProductAlfacart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
