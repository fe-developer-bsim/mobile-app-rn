import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
jest.mock('lodash');

import SmsOtpInput from '../SmsOtpInput.component';

describe('SmsOtpInput component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SmsOtpInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('handleEasyPinChange should set state', () => {
    const wrapper = shallow(<SmsOtpInput />);
    wrapper.instance().handleEasyPinChange('1223');
    expect(wrapper.state('value')).toBe('1223');
  });
});
