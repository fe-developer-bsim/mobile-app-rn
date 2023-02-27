import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import WaterBill from '../WaterBill.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(WaterBill);

describe('WaterBill Component: WaterBill', () => {
  it('renders correctly', () => {
    const billerData = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm billerData={billerData} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
