import React from 'react';
import UltraVoucherWebView from '../UltraVoucherWebView.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
configure({adapter: new Adapter()});

describe('UltraVoucherWebView component', () => {
  it('renders correctly', () => {
    const tree = shallow(<UltraVoucherWebView/>);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});