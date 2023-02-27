import React from 'react';
import renderer from 'react-test-renderer';
import PayHeader from '../PayHeader.component';

describe('NavHeader Componenent: PayHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <PayHeader/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
