import React from 'react';
import renderer from 'react-test-renderer';
import MgmTncReferFriend from '../MgmTncReferFriend.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../MgmTncReferFriend.component');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MgmTncReferFriend);

describe('MgmTncReferFriend: form page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
