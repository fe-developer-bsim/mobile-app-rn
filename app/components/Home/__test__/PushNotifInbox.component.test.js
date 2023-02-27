import React from 'react';
import renderer from 'react-test-renderer';

import PushNotifInbox from '../PushNotifInbox.component';

describe('PushNotifInbox component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<PushNotifInbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
