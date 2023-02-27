import React from 'react';
import renderer from 'react-test-renderer';
import IOSPicker from '../PickerRev.component';
import Touchable from '../../../Touchable.component';
import Overlay from '../../../Overlay/Overlay.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});


describe('FormComponent: IOSPicker component', () => {
  it('renders correctly', () => {
    const options = [];
    const labels = [];
    const tree = renderer.create(<IOSPicker options={options} labels={labels} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('IOSPicker when there are multiple options:', () => {
    const optionsMock = ['1', '2'];
    const showModalSpy = jest.fn();
    const onSelectSpy = jest.fn();
    const wrapper = shallow(<IOSPicker options={optionsMock} showModal={showModalSpy} modalVisible={true} onSelect={onSelectSpy}/>);

    xit('show modal when click picker', () => {
      const pickerTouchable = wrapper.find(Touchable).first();
      pickerTouchable.first().simulate('press');
      expect(showModalSpy).toBeCalled();
      const modal = wrapper.find(Overlay).first();
      expect(modal.props().visible).toEqual(true);
    });
  });
});
