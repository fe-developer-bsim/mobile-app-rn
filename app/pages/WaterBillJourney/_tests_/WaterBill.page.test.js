import React from 'react';
import renderer from 'react-test-renderer';
import WaterBill from '../WaterBill.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

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
const DecoratedForm = reduxForm({form: 'waterBillForm'})(WaterBill);

describe('WaterBillJourney: WaterBill page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
