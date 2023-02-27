
import React from 'react';
import Api from '../../../utils/api.util';
import Loginscreen from '../LoginWithUserPassword.page';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('Loginscreen: Loginscreen page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <Loginscreen/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('sets username and password', () => {
    const Login = new Loginscreen();
    Login.setUsername('test');
    expect(Login.state.username).toBe('test');
    Login.setPassword('pass');
    expect(Login.state.password).toBe('pass');
  });

  xit('onLogin should login', () => {
    const ApiMock = Api;
    ApiMock.login = jest.fn(() => new Promise(() => {}));
    const Login = new Loginscreen();
    Login.setLoginStatus = jest.fn();
    Login.state = {
      username: 'test',
      pass: 'pass'};
    Login.onLogin();
    expect(ApiMock.login).toBeCalled();
    jest.resetModules();
  });

});
