import React from 'react';
import renderer from 'react-test-renderer';
import LuckyDIpHeader from '../LuckyDIpHeader.component';

describe('NavHeader Componenent: LuckyDIpHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LuckyDIpHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
