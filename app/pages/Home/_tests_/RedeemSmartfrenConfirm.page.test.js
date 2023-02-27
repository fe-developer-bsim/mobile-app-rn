import React from 'react';
import renderer from 'react-test-renderer';
import RedeemSmartfrenConfirm from '../RedeemSmartfrenConfirm.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'RedeemSmartfrenConfirm'})(RedeemSmartfrenConfirm);

describe('Home: RedeemSmartfrenConfirm page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
