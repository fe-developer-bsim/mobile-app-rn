import React from 'react';
import renderer from 'react-test-renderer';
import TdCloseConfirmation from '../TdCloseConfirmation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'TdCloseConfirmationForm'})(TdCloseConfirmation);

describe('Home: TdCloseConfirmation page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
