import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationAccount from '../AboutSmartPromo.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../AboutSmartPromo.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(ConfirmationAccount);

describe('NTB OnboardingConfirmationAccount page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
