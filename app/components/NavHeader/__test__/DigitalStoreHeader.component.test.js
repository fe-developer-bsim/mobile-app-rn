import React from 'react';
import renderer from 'react-test-renderer';
import DigitalStoreHeader from '../DigitalStoreHeader.component';

describe('NavHeader Componenent: DigitalStoreHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <DigitalStoreHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});