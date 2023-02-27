import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeSixConfirmation from '../BillerTypeSixConfirmation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(BillerTypeSixConfirmation);

describe('BillerTypeSixConfirmation page', () => {
  it('renders correctly', () => {
    const billers = ['asdfasd', 'asdfasd'];
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} billers={billers} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
