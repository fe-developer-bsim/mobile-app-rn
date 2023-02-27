import React from 'react';
import renderer from 'react-test-renderer';
import SearchableListNewSearch from '../SearchableListNewSearch.component';
import NButtonTrf from '../NButtonTrf.component';
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

const wrapper = shallow(<SearchableListNewSearch {...props}/>);

describe('SearchableListNewSearch component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<SearchableListNewSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('Change input text', () => {
    wrapper.setState({searchText: '123456789'});
    wrapper.instance().onChangeInput('test');
    expect(onChangeTextSpy).toBeCalled();
    expect(validatorSpy).toBeCalled();
  });

  xit('state should be set when componentWillMount', () => {
    const expectedSearchList = ['1', '2'];
    expect(wrapper.state('searchlist')).toEqual(expectedSearchList);
  });

  xit('state should be set when componentWillReceiveProps', () => {
    const newList = ['3', '4'];
    wrapper.instance().componentWillReceiveProps({searchlist: newList});
    expect(wrapper.state('searchlist')).toEqual(newList);
  });

  xit('Next button should not be shown', () => {
    const nextButton = wrapper.find(NButtonTrf);
    expect(nextButton.length).toEqual(0);
  });

  describe('Enabled Next button', () => {
    const wrapper = shallow(<SearchableListNewSearch {...props} onNextClick={onNextClickSpy}/>);

    xit('Click Next button should work correctly ', () => {
      wrapper.setState({searchText: '123456789'});
      wrapper.instance().onNextClick();
      expect(onNextClickSpy).toBeCalled();
    });
  });


});
