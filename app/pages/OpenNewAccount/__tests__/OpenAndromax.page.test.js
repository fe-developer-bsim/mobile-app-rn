import React from 'react';
import renderer from 'react-test-renderer';
import OpenAndromax from '../OpenAndromax.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../OpenAndromax.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(OpenAndromax);

describe('PaymentStatus page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
