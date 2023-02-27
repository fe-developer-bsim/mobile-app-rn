import React from 'react';
import renderer from 'react-test-renderer';
import ProductsTnC from '../ProductsTnC.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(ProductsTnC);

describe('ProductsTnC page', () => {
  xit('renders correctly', () => {
    const displayList = {key: 'TYPE', value: 'PAYMENT'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm displayList={displayList}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
