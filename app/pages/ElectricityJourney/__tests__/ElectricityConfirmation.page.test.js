import React from 'react';
import renderer from 'react-test-renderer';
import ElectricityConfirmation from '../ElectricityConfirmation.page';
import set from 'lodash/set';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(ElectricityConfirmation);

describe('ElectricityConfirmation page', () => {
  it('renders correctly', () => {
    const navigation = set({}, 'state.biller', {});
    navigation.state.billDetails = {};
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} navigation={navigation} isConnected={networkStatus}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
