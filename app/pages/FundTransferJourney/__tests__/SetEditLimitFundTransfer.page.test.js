import React from 'react';
import renderer from 'react-test-renderer';
import SetEditLimitFundTransfer from '../SetEditLimitFundTransfer.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SetEditLimitFundTransfer);
describe('SetEditLimitFundTransfer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
