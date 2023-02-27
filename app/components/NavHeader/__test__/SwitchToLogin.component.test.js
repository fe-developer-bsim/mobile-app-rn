import React from 'react';
import renderer from 'react-test-renderer';
import SwitchToLogin from '../SwitchToLogin.component';

describe('NavHeader Componenent: SwitchToLogin', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SwitchToLogin navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
