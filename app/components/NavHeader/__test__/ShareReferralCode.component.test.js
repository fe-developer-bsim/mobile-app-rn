import React from 'react';
import renderer from 'react-test-renderer';
import ShareReferralCodeHeader from '../ShareReferralCodeHeader.component';

describe('NavHeader Componenent: ShareReferralCodeHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ShareReferralCodeHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
