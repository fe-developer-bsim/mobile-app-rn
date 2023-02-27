import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardIndex from '../CreditCardIndex.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({
  billerConfig: {billerAllowList: {
    listOfBiller: [
      {
        billerCode: '1234',
        billerPreferences: {code: 'wasd'}
      }
    ]
  }}
}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardIndex);

describe('CreditCardIndex page', () => {
  xit('renders correctly', () => {

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} store={store}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
