import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeEightConfirmation from '../BillerTypeEightConfirmation.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(BillerTypeEightConfirmation);

describe('BillerTypeEightConfirmation component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('easy pin should be shown', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BillerTypeEightConfirmation handleSubmit={spy} triggerAuth={spy}/>);
    wrapper.instance().showModal();
    expect(wrapper.state('authToggle')).toBe(true);
  });

  xit('easypin should submit', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BillerTypeEightConfirmation handleSubmit={spy}/>);
    wrapper.instance().onModalSubmit();
    expect(wrapper.state('authToggle')).toBe(false);
    expect(spy).toBeCalled();
  });

});
