import React from 'react';
import renderer from 'react-test-renderer';
import MgmTncReferFriend from '../MgmTncReferFriend.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../MgmTncReferFriend.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MgmTncReferFriend);
describe('MgmTncReferFriend', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
