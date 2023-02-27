import {theme, container as containerStyles, text as textStyles} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: {
    backgroundColor: theme.red
  },
  contentContainerStyle: [contentContainerStyle],
  bodyContainer: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  }, contentContainerStyle],
  bodyContainerWithTerms: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],
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
    paddingTop: 5,
    flexDirection: 'column',
    paddingHorizontal: 19
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    marginTop: 5
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
    backgroundColor: theme.radicalRed,
    justifyContent: 'space-between',
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
  withAtmCard: {
    color: theme.brand,
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium
  },
  containTextWithAtm: {
    paddingTop: 20
  },
  containNewAccount: {
    alignItems: 'center',
    paddingBottom: 15
  },
  textAccount: {
    color: theme.black,
    fontSize: theme.fontSizeNormal
  },
  textAccountSubtitle: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    textDecorationLine: 'underline',
  },
  profileIconStyle: {position: 'absolute', width: 40, right: 0, top: 35, paddingLeft: 15},
  paddingAddition: {
    paddingTop: 20,
    paddingHorizontal: 17
  },
  borderGreyResetPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 18,
    paddingTop: 30
  },
  buttonLoginText: {
    color: theme.black
  },
  otpRow: {
    flexDirection: 'row',
  },
  otpDetail: {
    color: theme.white,
    flexDirection: 'row',
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
  paddingHeader: {
    padding: 30
  },

  spaceContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
    // paddingTop: Platform.OS === 'ios' ? normalIosphone === true ? 80 : 85 : 60,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  whiteBgAtm: {
    backgroundColor: theme.white,
    height: height,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ?  0 : 5 : 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  newBodyContainerLogin: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  newEyeIcon: {position: 'absolute', width: 30, right: 13, top: 17},
  newCameraIcon: {position: 'absolute', width: 30, right: 10, top: 20},
  padding40: {
    paddingHorizontal: 30,
    paddingTop: 30
  },
  fieldContainer: {
    marginTop: 10,
    marginHorizontal: 30
  },
  logo: {
    width: 130,
    height: 43,
    marginRight: 10
  },
  welcomeTextContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  welcomeText: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontSize: theme.fontSize30
  },
  buttonLoginSubmit: {
    paddingBottom: 20
  },
  buttonMg: {
    alignItems: 'center'
  },
  bottomSpace: {
    marginHorizontal: 30
  },
  registerATMTitle: {
    marginBottom: 10
  },
  titleTextContainer: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
  },
  buttonSpace: {
    paddingBottom: 50
  },
  buttonAtmCont: {
    paddingHorizontal: 20,
    marginBottom: 50,
    paddingBottom: 20
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsBox: {
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 60,
    width: width * 0.85,
  },
  tipsBoxText: {
    width: width * 0.75,
  },
  tipsTxt: {
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'Roboto',
    paddingVertical: 10
  },
  greyLine: {
    marginTop: 10,
    backgroundColor: theme.greyLine,
    height: 2,
  },
  titleTxt: {
    fontWeight: theme.fontWeightLight,
    fontFamily: 'Roboto'
  },
  promptTxt: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  switchRight: {
    paddingRight: 10
  },
  menu: {
    paddingTop: 25,
  },
  buttonOtpSubmitPlus: {
    paddingBottom: 70,
    paddingTop: 20,
  },
  welcomeSubTitle: {
    paddingTop: 10,
    color: theme.black
  },
  cardTextContainer: {
    paddingTop: 30,
  },
  cardText: {
    textAlign: 'center',
    color: theme.brand,
    fontWeight: theme.fontWeightRegular,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto
  }
};
