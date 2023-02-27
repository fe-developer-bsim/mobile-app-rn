import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListQR from '../QuickPickListQR.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const ReactComponentPrototype = React.Component.prototype;

describe('QuickPickListQR component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListQR />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renderItem', () => {
    const rowData = {
      text: 'text',
      subtext: 'subtext'
    };
    const wrapper = shallow(<QuickPickListQR textKey='text' listOfItems={[]} subtextKey='subtext' />);
    const itemWrapper = wrapper.instance().renderItem(rowData);
    expect(itemWrapper.props.text).toBe('');
    expect(itemWrapper.props.subtext).toBe('');
  });

});
