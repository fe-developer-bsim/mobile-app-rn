import React from 'react';
import renderer from 'react-test-renderer';
import TabCreditCard from '../TabCreditCard.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AccountCarousel from '../AccountCarousel.component';
jest.mock('lodash');

describe('TabCreditCard component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<TabCreditCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renders account tabs correctly', () => {
    const accounts = {
      accountList: [1],
      transactionsCC: [{}, {}]
    };
    const wrapper = shallow(<TabCreditCard {...accounts}/>);
    const accountCarousel = wrapper.find(AccountCarousel);
    expect(accountCarousel.length).toBe(1);
  });
});
