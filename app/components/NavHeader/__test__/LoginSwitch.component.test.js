import React from 'react';
import renderer from 'react-test-renderer';
import LoginSwitch from '../LoginSwitch.component';
import Touchable from '../../Touchable.component';
import {NavigationActions} from 'react-navigation';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const dispatchSpy = jest.fn();

describe('LoginSwitch component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginSwitch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('switch to target page', () => {
    const wrapper = shallow(<LoginSwitch dispatch={dispatchSpy}/>);
    const navSpy = jest.spyOn(NavigationActions, 'navigate');
    const buttons = wrapper.find(Touchable);
    expect(buttons.length).toEqual(1);
    buttons.first().simulate('press');
    expect(dispatchSpy).toBeCalled();
    expect(navSpy).toBeCalled();
  });

  it('reset to landing and switch to target page', () => {
    const wrapper = shallow(<LoginSwitch dispatch={dispatchSpy} resetToLanding={true}/>);
    const resetNavSpy = jest.spyOn(NavigationActions, 'reset');
    const buttons = wrapper.find(Touchable);
    buttons.first().simulate('press');
    expect(dispatchSpy).toBeCalled();
    expect(resetNavSpy).toBeCalled();
  });
});
