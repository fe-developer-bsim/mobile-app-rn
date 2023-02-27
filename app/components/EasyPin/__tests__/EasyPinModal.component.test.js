import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import noop from 'lodash/noop';
jest.mock('lodash');
jest.mock('react-timer-mixin');

import EasyPinModal from '../EasyPinModal.component';

describe('EasyPinModal component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<EasyPinModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('should call the submitHandler function if the length of input is 6 digits', () => {
    const submitHandler = jest.fn(noop);
    const wrapper = shallow(<EasyPinModal submitHandler={submitHandler}/>);
    wrapper.instance().handleEasyPinChange(111111);
    expect(submitHandler).toBeCalled();
  });
});
