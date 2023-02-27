import React from 'react';
import renderer from 'react-test-renderer';
import SearchableListCountryIso from '../SearchableListCountryIso.component';
import NButton from '../NButton.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const onNextClickSpy = jest.fn();
const onChangeTextSpy = jest.fn();
const validatorSpy = jest.fn();

const props = {
  searchlist: ['1', '2'],
  onChangeText: onChangeTextSpy,
  validator: validatorSpy
};

const wrapper = shallow(<SearchableListCountryIso {...props}/>);

describe('SearchableListCountryIso component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchableListCountryIso />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Change input text', () => {
    wrapper.setState({searchText: '123456789'});
    wrapper.instance().onChangeInput('test');
    expect(onChangeTextSpy).toBeCalled();
    expect(validatorSpy).toBeCalled();
  });

  it('state should be set when componentWillMount', () => {
    const expectedSearchList = ['1', '2'];
    expect(wrapper.state('searchlist')).toEqual(expectedSearchList);
  });

  it('state should be set when componentWillReceiveProps', () => {
    const newList = ['3', '4'];
    wrapper.instance().componentWillReceiveProps({searchlist: newList});
    expect(wrapper.state('searchlist')).toEqual(newList);
  });

  it('Next button should not be shown', () => {
    const nextButton = wrapper.find(NButton);
    expect(nextButton.length).toEqual(0);
  });

  describe('Enabled Next button', () => {
    const wrapper = shallow(<SearchableListCountryIso {...props} onNextClick={onNextClickSpy}/>);

    it('Next button should be shown', () => {
      const nextButton = wrapper.find(NButton);
      expect(nextButton.length).toEqual(1);
      expect(nextButton.first().props().enabled).toEqual(false);
    });

    it('Next button should be enabled', () => {
      wrapper.setState({searchText: '123456789'});
      const enabledNextButton = wrapper.find(NButton).first();
      expect(enabledNextButton.props().enabled).toEqual(true);
    });

    it('Click Next button should work correctly ', () => {
      wrapper.setState({searchText: '123456789'});
      wrapper.instance().onNextClick();
      expect(onNextClickSpy).toBeCalled();
    });
  });


});
