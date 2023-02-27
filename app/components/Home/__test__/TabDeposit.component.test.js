import React from 'react';
import renderer from 'react-test-renderer';
import TabDeposit from '../TabDeposit.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AccountCarousel from '../AccountCarousel.component';

describe('TabDeposit component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TabDeposit />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders account tabs correctly', () => {
    const accounts = {
      accountList: [1],
      transactions: [{}, {}]
    };
    const wrapper = shallow(<TabDeposit {...accounts}/>);
    const accountCarousel = wrapper.find(AccountCarousel);
    expect(accountCarousel.length).toBe(1);
  });
});
