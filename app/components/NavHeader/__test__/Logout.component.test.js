import React from 'react';
import renderer from 'react-test-renderer';
import Logout from '../Logout.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Logout Componenent: Logout', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Logout/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('logout modal should close', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Logout handleSubmit={spy}/>);
    wrapper.instance().onModalClose();
    expect(wrapper.state('logoutModalToggle')).toBe(false);
  });

  xit('logout modal should be shown', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Logout handleSubmit={spy}/>);
    wrapper.instance().showModal();
    expect(wrapper.state('logoutModalToggle')).toBe(true);
  });

  xit('logout should submit', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Logout dispatch={spy} handleSubmit={spy}/>);
    wrapper.instance().logOff();
    expect(wrapper.state('logoutModalToggle')).toBe(false);
    expect(spy).toBeCalled();
  });
});
