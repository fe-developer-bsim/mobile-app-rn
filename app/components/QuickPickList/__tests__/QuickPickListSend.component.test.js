import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListSend from '../QuickPickListSend.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const ReactComponentPrototype = React.Component.prototype;

describe('QuickPickListSend component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListSend />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renderItem', () => {
    const rowData = {
      text: 'text',
      subtext: 'subtext'
    };
    const wrapper = shallow(<QuickPickListSend textKey='text' listOfItems={[]} subtextKey='subtext' />);
    const itemWrapper = wrapper.instance().renderItem(rowData);
    expect(itemWrapper.props.text).toBe('');
    expect(itemWrapper.props.subtext).toBe('');
  });

});
