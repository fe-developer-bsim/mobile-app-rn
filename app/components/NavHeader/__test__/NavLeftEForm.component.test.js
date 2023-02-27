import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftEForm from '../NavLeftEForm.component';

describe('NavHeader Componenent: NavLeftEForm', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftEForm/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
