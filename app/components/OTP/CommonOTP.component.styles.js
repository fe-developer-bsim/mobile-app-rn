import {theme, text as textStyles} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  columnContainer: {
    flex: 1,
  },
  containerResend: {
    paddingLeft: 20
  },
  disabledLink: {
    ...textStyles.text,
    paddingTop: 15,
    color: theme.white,
    textDecorationLine: 'underline',
  },
  dontHaveOTP: {
    ...textStyles.text,
    paddingTop: 15,
    color: theme.white,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: theme.padding,
    paddingHorizontal: 30
  },
  forgotEasyPinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  unrecognisedMobile: {
    alignItems: 'center',
    marginTop: theme.padding
  },
  forgotPasswordText: {
    color: theme.primary
  },
  cameraIconStyle: {position: 'absolute', width: 40, right: 0, top: 35},
  eyeIconStyle: {position: 'absolute', width: 30, right: 0, top: 30},
  buttonLargeTextStyle: buttonLargeTextStyle,

  loginProblemText: {
    ...textStyles.text,
    ...textStyles.justify
  },

  resetPasswordText: {
    color: theme.brand
  },
  bottomContainer: {
    paddingVertical: 10
  },
  greySmallText: {
    color: theme.placeholderTextColor,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  appLogoquestion: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 12,
    marginRight: 10
  },
  verifyEasyPin: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    paddingHorizontal: 20
  },
  rowEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 60
  },
  rowLoginEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingRight: 60
  },
  recognizeMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 2
  },
  dontRecogniseNumberText: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
    paddingRight: 20
  },
  loginWelcomeSubMessageOTP: {
    fontSize: theme.fontSizeMedium,
    paddingHorizontal: 20,
    color: theme.white
  },
  pinBodyContainer: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  }],
  scrambleKeyboardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  redSmallText: {
    color: theme.brand,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  footerText: {
    textAlign: 'center'
  },
  underlinedText: {
    paddingLeft: 5,
    paddingVertical: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  welcomeTextNew: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    ...textStyles.h1
  },
  welcomeSubTextNew: {
    paddingHorizontal: 20,
    color: theme.black
  },
  containerOTPBoarding: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  },
  welcomeTextNewEP: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    ...textStyles.h1
  },
  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  forgotPassWordUserName: {
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  forgotPassWordSubTitle: {
    paddingLeft: 20,
    color: theme.black,
    fontWeight: theme.fontWeightLight
  },
  rowTitlePlusName: {
    flexDirection: 'row',
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  rowOtpIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    padding: 20,
  },
  rowOtpSubIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  otpIcon: {
    paddingLeft: 35,
    paddingTop: 5,
    color: theme.white,
  },
  otpHeaderTitle: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXL,
    color: theme.white
  },
  easypinHeaderTitle: {
    ...textStyles.h1,
    color: theme.white,
    paddingBottom: 10
  },
  bodyContainerOTP: [{
    flexGrow: 1,
    backgroundColor: '#1bc276',
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],
  resendOtp: {
    backgroundColor: 'transparent',
  },
  buttonOtpSubmit: {
    paddingBottom: 20,
    paddingTop: 20
  },
  resendOtpButton: {
    color: theme.white,
    textDecorationLine: 'underline',
  },
  buttonOtpSubmitSimas: {
    borderColor: theme.black
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },
  bodyContainerEasyPin: [{
    flexGrow: 1,
    backgroundColor: theme.brand,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  mainTitleAttempts: {
    justifyContent: 'center',
    padding: 5,
    alignItems: 'flex-start',
  },
  mainTitleAttemptstext: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    paddingHorizontal: 25
  },
  otpPartSMS: {
    fontWeight: 'bold',
    fontSize: theme.fontSizeExtraXL
  },
  borderGrey: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  border: {
    height: 2,
    backgroundColor: theme.grey,
    width: 130,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonMainLogin: {
    color: theme.white
  },
  buttonMainLoginUser: {
    color: theme.red
  },
  buttonLoginSpace: {
    backgroundColor: 'transparent',
    borderColor: theme.red,
    borderWidth: 2,
    borderRadius: 50,
  },
  container: {
    paddingVertical: theme.padding,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  inputOTPCOntainer: {
    borderBottomColor: theme.white,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  inputOTP: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
    color: theme.white,
  },
  otpDetail: {
    flexDirection: 'row',
  },
  otpDetailText: {
    color: theme.white,
  },
  otpDetailTop: {
    color: theme.white,
    padding: 5,
    fontWeight: theme.fontWeightBold
  },
  containerDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: theme.white,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20
  },
  modalTextLeftContainer: {
    marginHorizontal: 5
  },
  modalTextRightContainer: {
    marginRight: 30,
  },
};
