import React from 'react';
import ContactsWrapper from '@tuofeng/react-native-contacts-wrapper';
import renderer from 'react-test-renderer';
import ContactsPicker from '../ContactsPicker.component.ios';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import noop from 'lodash/noop';
import Touchable from '../../../Touchable.component';

describe('ContactsPicker component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ContactsPicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('changeReduxForm should call redux form input onchange method with contact object', () => {
    const input = {onBlur: jest.fn(noop)};
    const wrapper = shallow(<ContactsPicker input={input}/>);
    wrapper.instance().changeReduxForm({});
    expect(input.onBlur).toBeCalledWith({});
    wrapper.instance().changeReduxForm(null);
    expect(input.onBlur).toBeCalledWith({});
    wrapper.instance().changeReduxForm(undefined);
    expect(input.onBlur).toBeCalledWith({});
  });
  it('clickHandler should be called on press', () => {
    const wrapper = shallow(<ContactsPicker />);
    wrapper.find(Touchable).simulate('press');
    expect(ContactsWrapper.getContact).toBeCalled();
  });
});
