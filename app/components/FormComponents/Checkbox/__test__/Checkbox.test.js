import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Check from 'react-native-checkbox';
import Checkbox from '../Checkbox.component';
import Touchable from '../../../Touchable.component';
import noop from 'lodash/noop';

describe('Checkbox component', () => {
  it('Checkbox: renders correctly', () => {
    const tree = renderer.create(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Disabled checkbox', () => {
    const wrapper = shallow(<Checkbox disabled={true}/>);
    const checkbox = wrapper.find(Touchable);
    expect(checkbox.length).toEqual(1);
    const check = wrapper.find(Check);
    expect(check.length).toEqual(1);
    expect(check.first().props().onChange).toEqual(noop);
  });

  describe('Enabled checkbox:', () => {
    const onChangeSpy = jest.fn();
    const input = {
      onChange: onChangeSpy
    };
    const wrapper = shallow(<Checkbox input={input}/>);
    const check = wrapper.find(Check);

    it('check checkbox', () => {
      check.first().props().onChange('test');
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });

    it('uncheck checkbox', () => {
      check.first().props().onChange('');
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });
  });


});
