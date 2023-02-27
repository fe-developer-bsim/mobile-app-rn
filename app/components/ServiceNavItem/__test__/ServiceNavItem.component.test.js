import React from 'react';
import renderer from 'react-test-renderer';
import ServiceNavItem from '../ServiceNavItem.component';
import Touchable from '../../Touchable.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('ServiceNavItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ServiceNavItem iconName='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('onPress should be called', () => {
    const onPressHandler = jest.fn();
    const wrapper = shallow(<ServiceNavItem onPress={onPressHandler} iconName='success'/>);
    wrapper.find(Touchable).simulate('press');
    expect(onPressHandler).toBeCalled();
    // expect(onPressHandler.mock.calls.length).toBe(1);
  });
});
