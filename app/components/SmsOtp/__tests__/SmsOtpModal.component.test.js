import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import noop from 'lodash/noop';
import SmsOtpModal from '../SmsOtpModal.component';
import {SinarmasButton} from '../../FormComponents';

const submitSpy = jest.fn();
const resendOTPSpy = jest.fn(() => new Promise((resolve) => {
  resolve();
}));
const onCloseSpy = jest.fn(noop);

describe('SmsOtpModal component', () => {
  const wrapper = shallow(<SmsOtpModal submitHandler={submitSpy} onClose={onCloseSpy}/>);

  it('renders correctly', () => {
    const tree = renderer.create(<SmsOtpModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should call the submitHandler function if the length of input is 6 digits', () => {
    wrapper.instance().handleSmsOtpChange(111111);
    expect(submitSpy).toBeCalled();
    expect(onCloseSpy).toBeCalled();
  });

  it('onclose should work correctly', () => {
    wrapper.instance().onClose();
    expect(onCloseSpy).toBeCalled();
    expect(wrapper.state('secondsRemaining')).toEqual(30);
  });

  describe('ResendOTP Disabled', () => {
    it('dont show resend OTP button when counting down and countdown starts with 30 seconds', () => {
      const wrapper = shallow(<SmsOtpModal handleSubmit={submitSpy} resendOTP={resendOTPSpy}/>);
      const buttons = wrapper.find(SinarmasButton);
      expect(buttons.length).toEqual(0);
      expect(wrapper.state('secondsRemaining')).toEqual(30);
    });
  });

  describe('ResendOTP Enabled', () => {
    const wrapper = shallow(<SmsOtpModal handleSubmit={submitSpy} resendOTP={resendOTPSpy}/>);
    beforeAll(() => {
      wrapper.setState({secondsRemaining: 0});
    });

    it('should render resen OTP button and submit OTP button', () => {
      const buttons = wrapper.find(SinarmasButton);
      expect(buttons.length).toEqual(1);
    });

    it('resendOTP prop should be called and resend button is disabled while resending OTP', () => {
      wrapper.instance().resendOTP();
      expect(resendOTPSpy).toBeCalled();
      expect(wrapper.state('resending')).toEqual(true);
      const resendButton = wrapper.find(SinarmasButton).first();
      expect(resendButton.props().disabled).toEqual(true);
    });

    it('restart countdown with 30 seconds when resend otp is done', () => {
      const tickSpy = jest.spyOn(wrapper.instance(), 'tick');
      wrapper.instance().resendOTP().then(() => {
        expect(tickSpy).toBeCalled();
        expect(wrapper.state('secondsRemaining')).toEqual(30);
        expect(wrapper.state('resending')).toEqual(false);
        const buttons = wrapper.find(SinarmasButton);
        expect(buttons.length).toEqual(0);
      });
    });
  });
});
