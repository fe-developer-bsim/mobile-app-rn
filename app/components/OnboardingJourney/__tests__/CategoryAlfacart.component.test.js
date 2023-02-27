import React from 'react';
import renderer from 'react-test-renderer';
import CategoryAlfacart from '../CategoryAlfacart.component';

describe('NavHeader Componenent: CategoryAlfacart', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <CategoryAlfacart navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
