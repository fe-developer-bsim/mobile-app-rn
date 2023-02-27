import React from 'react';
import renderer from 'react-test-renderer';
import MobileTopupForm from '../MobileTopupForm.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MobileTopupForm);

describe('MobileTopupForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onNext should call goToPayment', () => {
    const spy = jest.fn();
    const biller = {test: 'test'};
    const wrapper = shallow(<MobileTopupForm goToPayment={spy} selectedBiller={biller}/>);
    wrapper.instance().onNext();
    expect(spy).toBeCalledWith(biller);
  });

});
