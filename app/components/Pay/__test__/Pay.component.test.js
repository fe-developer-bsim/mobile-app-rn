import React from 'react';
import renderer from 'react-test-renderer';
import Pay from '../Pay.component';
import ServiceNavItem from '../../ServiceNavItem/ServiceNavItem.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('OnboardingJourney Component: AccountSettingsView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Pay/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('render 2 ServiceNavItem components', () => {
    const navigateTo = jest.fn();
    const billerMenuOrder = [0];
    const wrapper = shallow(<Pay navigateTo={navigateTo} billerMenuOrder={billerMenuOrder}/>);
    const items = wrapper.find(ServiceNavItem);
    items.first().simulate('press');
    expect(navigateTo).toBeCalled();
  });
});
