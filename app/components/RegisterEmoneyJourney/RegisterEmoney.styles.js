import {theme, container as containerStyles, text as textStyles} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle, fontSizeXLStyle} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.white
  },
  contentContainerStyle: [contentContainerStyle],
  bodyContainer: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  }, contentContainerStyle],
  bodyContainerWithTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-evenly',
    paddingBottom: -10,
  },
  columnContainer: {
    flex: 1,
  },
  loginButtonContainer: {
    ...containerStyles.padding,
  },
  loginWelcomeMessage: {
    ...textStyles.h1,
    ...textStyles.center,
    paddingVertical: theme.padding,
  },
  loginWelcomeSubMessage: {
    ...textStyles.text,
    ...textStyles.center,
    paddingHorizontal: 10
  },
  loginFieldsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  errorText: {
    fontSize: textStyles.textSM,
  },
  text: {
    ...textStyles.text
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  iconInputTips: {
    paddingLeft: 50,
    paddingTop: 4,
    ...textStyles.textSM
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
  registerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerText: {
    paddingLeft: 5,
    paddingVertical: 10,
    textDecorationLine: 'underline',
    ...textStyles.primary,
    fontSize: theme.fontSizeSmall
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
  appLogoeasypin: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 27
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
  captchaContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingRight: 10
  },
  captchaFieldContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  captchaIcon: {
    width: 130,
    height: 50
  },
  captchaPadding: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  captchaBorder: {
    borderWidth: 0.5,
    borderColor: theme.placeholderTextColor,
  },
  registerAtmWelcomeMessage: {
    ...textStyles.h1,
    paddingBottom: 20,
    paddingLeft: 10
  },
  registerAtmWelcomeSubMessage: {
    ...textStyles.text,
    color: theme.black,
    paddingLeft: 20
  },
  registerAtmTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  registerAtmTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    paddingHorizontal: 10,
    fontWeight: '300',
  },
  registerAtmTitleTextBottom: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    paddingHorizontal: 10,
    paddingBottom: 20,
    fontWeight: '300',
  },
  registerAtmSubMessage: {
    ...textStyles.text,
    paddingHorizontal: 10
  },
  receiptImage: {
    width: 150,
    height: 200
  },
  receiptContainer: {
    paddingTop: 20,
    paddingHorizontal: 10
  },
  underlinedText: {
    paddingLeft: 5,
    paddingVertical: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  refreshCaptcha: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  captchaLoader: {
    size: 80,
    borderWidth: 0,
    color: theme.brand,
    unfilledColor: theme.containerGrey
  },
  captchaInfo: {
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5,
    textAlign: 'center'
  },
  refreshCaptchaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  fingerPrintContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  borderGrey: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
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
  quickLoginIcon: {
    color: theme.white
  },
  quickLoginIconContainer: {
    paddingRight: 10
  },
  quickLoginBorder: {
    borderLeftWidth: 1,
    paddingRight: 20,
    marginLeft: 20,
    borderColor: theme.white
  },
  quickLoginContainer: {
    flexDirection: 'row',
    padding: 30
  },
  captchaBorderAround: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  upperContainer: {
    paddingHorizontal: 20,
  },
  atmUpperContain: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.red,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20,
    borderRadius: 5
  },
  atmUpperContainer: {
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 20,
  },
  whiteText: {
    color: theme.white
  },
  whiteTextTitle: {
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
  },
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  emoneyTitle: [fontSizeXLStyle]
};
