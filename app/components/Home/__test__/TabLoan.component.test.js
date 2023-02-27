import React from 'react';
import renderer from 'react-test-renderer';
import TabLoan from '../TabLoan.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AccountCarousel from '../AccountCarousel.component';

describe('TabLoan component', () => {
  const accounts = {
    accountList: [{}],
    transactions: [{}, {}]
  };
  xit('renders correctly', () => {
    const tree = renderer.create(<TabLoan {...accounts} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renders account tabs correctly', () => {
    const accounts = {
      accountList: [1],
      transactions: [{}, {}]
    };
    const wrapper = shallow(<TabLoan {...accounts}/>);
    const accountCarousel = wrapper.find(AccountCarousel);
    expect(accountCarousel.length).toBe(1);
  });
});
