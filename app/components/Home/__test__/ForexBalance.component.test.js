import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import ForexBalance from '../ForexBalance.component';
import {View} from 'react-native';

describe('ForexBalance page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ForexBalance text='test'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('isCollapsed: should be false by default', () => {
    const wrapper = shallow(<ForexBalance />);
    expect(wrapper.instance().state.isCollapsed).toBe(true);
  });
  xit('toggleCollapse: should toggleCollapse isCollapsed', () => {
    const wrapper = shallow(<ForexBalance />);
    expect(wrapper.instance().state.isCollapsed).toBe(true);
    wrapper.instance().toggleCollapse();
    expect(wrapper.instance().state.isCollapsed).toBe(false);
  });
  it('getForexBalances: should toggleCollapse isCollapsed', () => {
    const forexBalances = {USD: 401.10, AUD: 1235};
    const wrapper = shallow(<ForexBalance forexBalances={forexBalances}/>);
    const balanceViews = wrapper.instance().getForexBalances();
    expect(balanceViews.length).toBe(2);
    expect(balanceViews[0].type).toBe(View);
  });
});
