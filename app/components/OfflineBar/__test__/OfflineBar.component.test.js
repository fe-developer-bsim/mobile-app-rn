import React from 'react';
import renderer from 'react-test-renderer';
import {Animated, AppState} from 'react-native';
import OfflineBar from '../OfflineBar.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetInfo from '@react-native-community/netinfo';

configure({adapter: new Adapter()});

describe('OfflineBar component', () => {
  it('OfflineBar: renders correctly', () => {
    const networkStatus = {isConnected: true};
    const tree = renderer.
      create(<OfflineBar networkStatus={networkStatus} />).
      toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('componentWillMount: should set networkStatus and this.animation on componentWillMount ', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar setNetworkStatus={spy} />);
    wrapper.instance().componentWillMount();
    expect(NetInfo.addEventListener).toBeCalledWith(
      'connectionChange',
      spy
    );
    expect(AppState.addEventListener).toBeCalled();
    expect(wrapper.instance().animation instanceof Animated.Value).toBe(true);
  });
  xit('componentWillUnMount: should removeEventListeners', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar setNetworkStatus={spy} />);
    wrapper.instance().componentWillUnMount();
    expect(NetInfo.removeEventListener).toBeCalledWith(
      'connectionChange',
      spy
    );
    expect(AppState.removeEventListener).toBeCalled();
  });
  it('componentWillReceiveProps: should trigger animation if highlightText is true', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar resetNetworkBar={spy} />);
    const instance = wrapper.instance();
    instance.triggerAnimation = jest.fn();
    instance.componentWillReceiveProps({highlightText: true});
    expect(instance.triggerAnimation).toBeCalled();
    expect(spy).toBeCalled();
  });
  it('componentWillReceiveProps: should not trigger animation if highlightText is false', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar resetNetworkBar={spy} />);
    const instance = wrapper.instance();
    instance.triggerAnimation = jest.fn();
    instance.componentWillReceiveProps({highlightText: false});
    expect(instance.triggerAnimation).not.toBeCalled();
    expect(spy).not.toBeCalled();
  });
  it('triggerAnimation: should trigger the animation', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar resetNetworkBar={spy} />);
    const instance = wrapper.instance();
    instance.animation.setValue = jest.fn();
    instance.triggerAnimation();
    expect(Animated.timing).toBeCalled();
    expect(instance.animation.setValue).toBeCalledWith(0);
  });
  it('_handleAppStateChange: should fetch netinfo if app state is active', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar resetNetworkBar={spy} />);
    const instance = wrapper.instance();
    instance._handleAppStateChange('active');
    expect(NetInfo.fetch).toHaveBeenCalledTimes(1);
  });
  it('_handleAppStateChange: should not fetch netinfo if app state is inactive', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OfflineBar resetNetworkBar={spy} />);
    const instance = wrapper.instance();
    instance._handleAppStateChange('inactive');
    expect(NetInfo.fetch).toHaveBeenCalledTimes(1);
  });
});
