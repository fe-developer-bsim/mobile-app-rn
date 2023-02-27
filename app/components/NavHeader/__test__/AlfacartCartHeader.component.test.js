import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartCartHeader from '../AlfacartCartHeader.component';

describe('NavHeader Componenent: AlfacartCartHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AlfacartCartHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});