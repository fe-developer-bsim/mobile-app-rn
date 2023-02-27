import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import OverlayRadius from '../OverlayRadiusRev.component';

describe('OverlayRadius component', () => {
  it('OverlayRadius: renders correctly', () => {
    const tree = renderer.create(<OverlayRadius />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('_stopPropagation: should stop propagation', () => {
    const wrapper = shallow(<OverlayRadius/>);
    const eve = {stopPropagation: jest.fn()};
    wrapper.instance()._stopPropagation(eve);
    expect(eve.stopPropagation).toBeCalled();
  });
  it('should define initial state based on passed prop', () => {
    expect(shallow(<OverlayRadius visible={true}/>).state('visible')).toBe(true);
    expect(shallow(<OverlayRadius visible={false}/>).state('visible')).toBe(false);
  });
  it('_hideModal: should hide modal and call onClose', () => {
    const onCloseSpy = jest.fn();
    const wrapper = shallow(<OverlayRadius onClose={onCloseSpy}/>);
    wrapper.instance()._hideModal();
    expect(wrapper.state('visible')).toBe(false);
    expect(onCloseSpy).toBeCalled();
  });
  it('componentWillReceiveProps should update visible value if changed', () => {
    const wrapper = shallow(<OverlayRadius/>);
    expect(wrapper.state('visible')).toBe(false);
    wrapper.instance().componentWillReceiveProps({visible: true});
    expect(wrapper.state('visible')).toBe(true);
  });
});
