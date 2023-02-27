import React from 'react';
import renderer from 'react-test-renderer';
import AutoDebitListHeader from '../AutoDebitListHeader.component';

describe('NavHeader Componenent: AutoDebitListHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AutoDebitListHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});