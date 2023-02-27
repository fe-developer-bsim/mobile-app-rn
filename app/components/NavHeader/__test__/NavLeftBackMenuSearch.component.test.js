import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftBackMenuSearch from '../NavLeftBackMenuSearch.component';

describe('NavHeader Componenent: NavLeftBackMenuSearch', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftBackMenuSearch/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
