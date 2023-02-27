import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Overlay from '../Overlay.component';

describe('Overlay component', () => {
  it('Overlay: renders correctly', () => {
    const tree = renderer.create(<Overlay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('_stopPropagation: should stop propagation', () => {
    const wrapper = shallow(<Overlay/>);
    const eve = {stopPropagation: jest.fn()};
    wrapper.instance()._stopPropagation(eve);
    expect(eve.stopPropagation).toBeCalled();
  });
  it('should define initial state based on passed prop', () => {
    expect(shallow(<Overlay visible={true}/>).state('visible')).toBe(true);
    expect(shallow(<Overlay visible={false}/>).state('visible')).toBe(false);
  });
  it('_hideModal: should hide modal and call onClose', () => {
    const onCloseSpy = jest.fn();
    const wrapper = shallow(<Overlay onClose={onCloseSpy}/>);
    wrapper.instance()._hideModal();
    expect(wrapper.state('visible')).toBe(false);
    expect(onCloseSpy).toBeCalled();
  });
  it('componentWillReceiveProps should update visible value if changed', () => {
    const wrapper = shallow(<Overlay/>);
    expect(wrapper.state('visible')).toBe(false);
    wrapper.instance().componentWillReceiveProps({visible: true});
    expect(wrapper.state('visible')).toBe(true);
  });
});
