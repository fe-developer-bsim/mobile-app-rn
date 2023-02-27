import React from 'react';
import renderer from 'react-test-renderer';
import QRMerchantRegister3 from '../QRMerchantRegister3.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'QRMerchantRegister3'})(QRMerchantRegister3);

describe('QRMerchantRegister3 component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
