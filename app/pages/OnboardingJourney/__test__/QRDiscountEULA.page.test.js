import React from 'react';
import renderer from 'react-test-renderer';
import QRDiscountEULA from '../QRDiscountEULA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../QRDiscountEULA.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(QRDiscountEULA);

describe('QRDiscountEULA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
