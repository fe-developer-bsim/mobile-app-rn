import React from 'react';
import renderer from 'react-test-renderer';
import DigitalEFormSuccessScreen from '../DigitalEFormSuccessScreen.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(DigitalEFormSuccessScreen);

describe('DigitalEFormSuccessScreen page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});