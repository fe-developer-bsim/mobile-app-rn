import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListMenuSearch from '../QuickPickListMenuSearch.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const ReactComponentPrototype = React.Component.prototype;

describe('QuickPickListMenuSearch component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<QuickPickListMenuSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('renderItem', () => {
    const rowData = {
      text: 'text',
      subtext: 'subtext'
    };
    const wrapper = shallow(<QuickPickListMenuSearch textKey='text' listOfItems={[]} subtextKey='subtext' />);
    const itemWrapper = wrapper.instance().renderItem(rowData);
    expect(itemWrapper.props.text).toBe('text');
    expect(itemWrapper.props.subtext).toBe('subtext');
  });

});
