import React from 'react';
import renderer from 'react-test-renderer';
import TabCasa from '../TabCasa.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AccountCarousel from '../AccountCarousel.component';

describe('TabCasa component', () => {
  const accounts = {
    accountList: [{}],
    transactions: [{}, {}]
  };
  xit('renders correctly', () => {
    const tree = renderer.create(<TabCasa {...accounts} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renders account tabs correctly', () => {
    const accounts = {
      accountList: [1],
      transactions: [{}, {}]
    };
    const wrapper = shallow(<TabCasa {...accounts}/>);
    const accountCarousel = wrapper.find(AccountCarousel);
    expect(accountCarousel.length).toBe(1);
  });
});
