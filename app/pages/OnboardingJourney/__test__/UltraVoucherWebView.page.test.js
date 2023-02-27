import React from 'react';
import UltraVoucherWebView from '../UltraVoucherWebView.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
configure({adapter: new Adapter()});

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(UltraVoucherWebView);

describe('UltraVoucherWebView page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = shallow(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} handleSubmit={spy}/>
      </Provider>
    );
    expect(toJSON(tree)).toMatchSnapshot();
  });
});