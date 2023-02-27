import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
jest.mock('lodash');

import EmailVerificationInput from '../DigitalEFormEmailVerificationInput.component';

describe('EmailVerificationInput component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<EmailVerificationInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('handleEasyPinChange should set state', () => {
    const wrapper = shallow(<EmailVerificationInput />);
    wrapper.instance().handleEasyPinChange('1223');
    expect(wrapper.state('value')).toBe('1223');
  });
});
