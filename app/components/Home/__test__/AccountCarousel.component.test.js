import React from 'react';
import renderer from 'react-test-renderer';
import AccountCarousel from '../AccountCarousel.component';
import AccountInfoItem from '../../AccountInfoItem/AccountInfoItem.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('AccountCarousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AccountCarousel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders account items correctly', () => {
    const accountList = [
      {
        accountType: 'SavingAccount'
      }, {
        accountType: 'CurrentAccount'
      }, {
        accountType: 'TimeDeposit'
      }, {
        accountType: 'CreditCard'
      }];
    const wrapper = shallow(<AccountCarousel accountList={accountList}/>);
    const items = wrapper.find(AccountInfoItem);
    expect(items.length).toBe(0);
  });
});
