import React from 'react';
import renderer from 'react-test-renderer';
import LoginSwitchEasyPin from '../LoginSwitchEasyPin.component';

describe('NavHeader Componenent: LoginSwitchEasyPin', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LoginSwitchEasyPin navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
