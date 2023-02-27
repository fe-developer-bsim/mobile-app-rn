import React from 'react';
import renderer from 'react-test-renderer';
import PaymentStatusComponent from '../PaymentStatus.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {SinarmasButton} from '../../FormComponents';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(PaymentStatusComponent);

const onCloseSpy = jest.fn();

const wrapper = shallow(<PaymentStatusComponent onClose={onCloseSpy}/>);

describe('PaymentStatusComponent component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm onClose={onCloseSpy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('submit confirm payment', () => {
    const submitButton = wrapper.find(SinarmasButton).first();
    submitButton.simulate('press');
    expect(onCloseSpy).toBeCalled();
  });
});
