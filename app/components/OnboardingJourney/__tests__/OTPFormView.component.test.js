import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import OTPFormView from '../OTP.component';
import {SinarmasButtonOnboarding, SinarmasButton} from '../../FormComponents';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const submitSpy = jest.fn();
const resendOTPSpy = jest.fn(() => new Promise((resolve) => {
  resolve();
}));
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(OTPFormView);

describe('OnboardingJourney Component: OTPFormView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={submitSpy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('submit OTP', () => {
    const wrapper = shallow(<OTPFormView handleSubmit={submitSpy} resendOTP={resendOTPSpy}/>);
    const buttons = wrapper.find(SinarmasButtonOnboarding);
    expect(buttons.length).toEqual(1);
    buttons.first().simulate('press');
    expect(submitSpy).toBeCalled();
  });

  describe('ResendOTP Disabled', () => {
    it('dont show resend OTP button when counting down and countdown starts with 30 seconds', () => {
      const wrapper = shallow(<OTPFormView handleSubmit={submitSpy} resendOTP={resendOTPSpy}/>);
      const buttons = wrapper.find(SinarmasButtonOnboarding);
      expect(buttons.length).toEqual(1);
      expect(wrapper.state('secondsRemaining')).toEqual(30);
    });
  });

  describe('ResendOTP Enabled', () => {
    const wrapper = shallow(<OTPFormView handleSubmit={submitSpy} resendOTP={resendOTPSpy}/>);
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
      });
    });
  });
});
