import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Dashboard from '../Dashboard.component';
import TabCasa from '../TabCasa.component';
import TabDeposit from '../TabDeposit.component';
import TabCreditCard from '../TabCreditCard.component';
import TabLoan from '../TabLoan.component';
import {reduxForm} from 'redux-form';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm'
})(Dashboard);

const accounts = {
  savingAccount: [],
  currentAccount: [],
  timeDepositAccount: [],
  creditCardAccount: [],
  rdn: []
};

describe('Dashboard component', () => {

  const wrapper = shallow(<Dashboard tabAccounts={accounts}/>);

  xit('renders correctly', () => {
    const accounts = {};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm tabAccounts={accounts} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders account tabs correctly', () => {
    const casaTab = wrapper.find(TabCasa);
    expect(casaTab.length).toBe(2);
    const depositTab = wrapper.find(TabDeposit);
    expect(depositTab.length).toBe(1);
    const creditCardTab = wrapper.find(TabCreditCard);
    expect(creditCardTab.length).toBe(1);
    const loanTab = wrapper.find(TabLoan);
    expect(loanTab.length).toBe(1);
  });

});
