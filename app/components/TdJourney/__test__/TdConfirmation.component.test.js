import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import TdSummary from '../TdConfirmation.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(TdSummary);

describe('TdSummary should render', () => {
  const navigation = {state: {params: {tdSummary: {completionDate: '2017-04-10T07:19:38.081Z'}}}};
  it('renders correctly', () => {
    const formValues = {};
    const accountNo = {};
    const navigation = {state: {params: {tdSummary: {completionDate: '2017-04-10T07:19:38.081Z'}}}};

    const triggerAuth = jest.fn();
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accountNo={accountNo} triggerAuth={triggerAuth} navigation={navigation}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('showModal: ', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TdSummary triggerAuth={spy} navigation={navigation}/>);
    wrapper.instance().showModal();
    expect(spy).toBeCalled();
  });
  xit('onSubmitModal:', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TdSummary handleSubmit={spy} navigation={navigation}/>);
    wrapper.instance().onModalSubmit();
    expect(spy).toBeCalled();
  });
});
