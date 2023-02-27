import React from 'react';
import renderer from 'react-test-renderer';
import Introduction from '../Introduction.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
jest.mock('react-timer-mixin');

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(Introduction);

describe('NTB Onboarding: INTRO', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
