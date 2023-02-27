import React from 'react';
import renderer from 'react-test-renderer';
import TransactionHeaderOptions from '../TransactionHeaderOptionsEmoney.component';
import Touchable from '../../Touchable.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import noop from 'lodash/noop';

describe('TransactionHeaderOptions component', () => {
  const navigate = jest.fn();
  it('renders correctly', () => {
    const tree = renderer.create(<TransactionHeaderOptions navigate={navigate} dispatch={noop} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should navigate on filter click', () => {
    const wrapper = shallow(<TransactionHeaderOptions navigate={navigate} dispatch={noop} />);
    wrapper.find(Touchable).first().simulate('press');
    expect(navigate).toBeCalledWith('TransactionFilterEmoneyScreen');
  });
});
