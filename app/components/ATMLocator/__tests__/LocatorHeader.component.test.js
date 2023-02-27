import React from 'react';
import renderer from 'react-test-renderer';
import LocatorHeader from '../LocatorHeader.component';
import Touchable from '../../Touchable.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import noop from 'lodash/noop';

jest.mock('../LocatorHeader.component');

describe('LocatorHeader component', () => {
  const navigate = jest.fn();
  const setParams = jest.fn();
  it('renders correctly', () => {
    const tree = renderer.create(<LocatorHeader navigate={navigate} dispatch={noop} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('Should navigate on button click', () => {
    const wrapper = shallow(<LocatorHeader navigate={navigate} dispatch={noop} setParams={setParams} />);
    wrapper.find(Touchable).first().simulate('press');
    expect(navigate).toBeCalledWith('Locator');
  });
});
