import React from 'react';
import renderer from 'react-test-renderer';
import QRTrfConfirm from '../QRTrfConfirm.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'QRForm'})(QRTrfConfirm);

describe('Home: QRTrfConfirm page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
