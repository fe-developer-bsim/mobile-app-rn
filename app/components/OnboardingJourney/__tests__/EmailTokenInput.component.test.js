import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
jest.mock('lodash');

import EmailTokenInput from '../EmailTokenInput.component';

describe('EmailTokenInput component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EmailTokenInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('handleEasyPinChange should set state', () => {
    const wrapper = shallow(<EmailTokenInput />);
    wrapper.instance().handleEasyPinChange('1223');
    expect(wrapper.state('value')).toBe('1223');
  });
});
