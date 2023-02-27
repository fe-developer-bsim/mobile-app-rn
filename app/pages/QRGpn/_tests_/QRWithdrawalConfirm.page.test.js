import React from 'react';
import renderer from 'react-test-renderer';
import QRWithdrawalConfirm from '../QRWithdrawalConfirm.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'QRForm'})(QRWithdrawalConfirm);

describe('Home: QRWithdrawalConfirm page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
