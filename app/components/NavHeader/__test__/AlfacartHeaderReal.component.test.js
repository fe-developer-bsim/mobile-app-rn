import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartHeaderReal from '../AlfacartHeaderReal.component';

describe('NavHeader Componenent: AlfacartHeaderReal', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AlfacartHeaderReal/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
