import React from 'react';
import renderer from 'react-test-renderer';
import PushNotifInbox from '../PushNotifInbox.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(PushNotifInbox);
describe('PushNotifInbox', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
