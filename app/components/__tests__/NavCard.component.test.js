import React from 'react';
import Touchable from '../Touchable.component';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import NavListItem from '../NavListItem/NavListItem.component';

describe('NavListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NavListItem featureIconName='home'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('onPress should be called', () => {
    const onPressHandler = jest.fn();
    const wrapper = shallow(<NavListItem onPress={onPressHandler} featureIconName='home'/>);
    wrapper.find(Touchable).simulate('press');
    expect(onPressHandler.mock.calls.length).toBe(1);
  });
});
