import React from 'react';
import renderer from 'react-test-renderer';
import MobilePostpaid from '../MobileTopupIndex.page';
import set from 'lodash/set';
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
const DecoratedForm = reduxForm({form: 'testForm'})(MobilePostpaid);

describe('MobilePostpaid page', () => {
  it('renders correctly', () => {
    const navigation = set({}, 'state.biller', {});
    navigation.state.billDetails = {};
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} navigation={navigation} isConnected={networkStatus} store={store}
          onNewTopup={spy} onRecentTopup={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
