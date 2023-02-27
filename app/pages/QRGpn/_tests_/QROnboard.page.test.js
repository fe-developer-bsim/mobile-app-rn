import React from 'react';
import renderer from 'react-test-renderer';
import QROnboard from '../QROnboard.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../QROnboard.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'QRForm'})(QROnboard);

describe('Home: QROnboard page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
