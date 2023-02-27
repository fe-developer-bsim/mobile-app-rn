import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardNPWPCamera from '../CreditCardNPWPCamera.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({user: {}}));
const DecoratedForm = reduxForm({form: 'CameraForm'})(CreditCardNPWPCamera);

describe('CreditCardNPWPCamera page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
