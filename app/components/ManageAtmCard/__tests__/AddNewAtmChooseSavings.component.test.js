import React from 'react';
import renderer from 'react-test-renderer';
import AddNewAtmChooseSavings from '../AddNewAtmChooseSavings.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(AddNewAtmChooseSavings);

describe('AddNewAtmChooseSavings page', () => {
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
