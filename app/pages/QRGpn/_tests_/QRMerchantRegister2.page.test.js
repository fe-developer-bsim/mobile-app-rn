import React from 'react';
import renderer from 'react-test-renderer';
import QRMerchantRegister2 from '../QRMerchantRegister2.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'formQRGPN'})(QRMerchantRegister2);

describe('Home: QRMerchantRegister2 page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
