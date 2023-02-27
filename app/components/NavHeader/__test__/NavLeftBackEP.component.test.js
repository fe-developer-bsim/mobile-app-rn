import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftBackEP from '../NavLeftBackEP.component';

describe('NavHeader Componenent: NavLeftBackEP', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftBackEP/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
