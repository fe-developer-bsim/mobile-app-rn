import React from 'react';
import renderer from 'react-test-renderer';
import ChooseProducts from '../ChooseProducts.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(ChooseProducts);

describe('ChooseProducts page', () => {
  xit('renders correctly', () => {
    const displayList = {key: 'TYPE', value: 'PAYMENT'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm displayList={displayList} mockImageLocation={true}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
