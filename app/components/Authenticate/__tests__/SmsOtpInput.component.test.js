import React from 'react';
import renderer from 'react-test-renderer';
import {theme} from '../../../styles/core.styles';
jest.mock('lodash');

import SmsOtpInput from '../SmsOtpInput.component';

describe('SmsOtpInput component', () => {
  it('renders correctly', () => {
    const style = {
      fontSize: theme.fontSizeXL,
      textAlign: 'center',
      paddingVertical: 5,
      height: 60,
    };
    const tree = renderer.create(<SmsOtpInput style={style}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
