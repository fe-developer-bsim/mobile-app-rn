import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyHeader from '../EmoneyHeader.component';

describe('NavHeader Componenent: EmoneyHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EmoneyHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});