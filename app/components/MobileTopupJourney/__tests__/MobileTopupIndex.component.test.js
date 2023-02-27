import React from 'react';
import renderer from 'react-test-renderer';
import MobileTopupIndex from '../MobileTopupIndex.component';

describe('MobileTopup component', () => {

  it('renders correctly', () => {
    const onNewTopup = jest.fn();
    const onRecentTopup = jest.fn();
    const recentTopupList = [{
      text: 'Irsyaad',
      subtext: '001 002 0023 0023'
    }, {
      text: 'Arsyaad',
      subtext: '1231 202 0023 6423'
    }, {
      text: 'Arsyaad',
      subtext: '1231 202 0023 6423'
    }];

    const tree = renderer.create(
      <MobileTopupIndex onNewTopup={onNewTopup} onRecentTopup={onRecentTopup} recentTopupList={recentTopupList}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
