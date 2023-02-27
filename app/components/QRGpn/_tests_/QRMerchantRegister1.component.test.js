import React from 'react';
import renderer from 'react-test-renderer';
import QRMerchantRegister1 from '../QRMerchantRegister1.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'formQRGPN'})(QRMerchantRegister1);

describe('QRMerchantRegister1 component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
