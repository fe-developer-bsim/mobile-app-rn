import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, styles.contentContainerStyle],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }
  ],
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  mainTitleContainer: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  mainTitleTxt: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSize22,
    color: theme.black
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  sectionBox: {
    borderRadius: 5,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.white,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginBottom: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
  },
  sectionTitleDisabled: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.robotoLight,
    width: width - 100,
  },
  disabledArrIcon: {
    color: theme.grey,
    alignSelf: 'center'
  },
  arrIcon: {
    color: theme.brand,
    alignSelf: 'center'
  },
  successIcon: {
    color: theme.green,
    alignSelf: 'center'
  },

  // render eform
  fieldFooter: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    marginBottom: 20
  },
  boxedInfo: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    marginVertical: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconColor: {
    color: theme.black,
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    borderColor: theme.white,
    fontSize: theme.fontSizeNormal,
  },
  cameraContainer: {
    flex: 1,
  },
  preview: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  rightText: [
    styles.fontSizeXLStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  topContainer: {
    width: width,
    height: 10 / 100 * height,
    backgroundColor: theme.opacityBlack,
    alignSelf: 'flex-start',
  },
  sideContainer: {
    width: 15 / 100 * width,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideContainerSelfie: {
    paddingHorizontal: 20,
    width: width,
    height: height / 7,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  normalText: [
    styles.fontSizeXLStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  footerText: [
    styles.fontSizeNormalStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  leftText: [
    styles.fontSizeNormalStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  capture: {
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: theme.opacityBlack,
    width: width,
  },

  // image confirmation
  missingInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  photoTextContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  photoText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand,
    fontFamily: theme.roboto,
  },
  missingInfoBottomWrapper: {
    paddingBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  buttonNextConf: {
    flex: 1
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
  paddingAddition: {
    paddingTop: 20,
  },
  captchaBorder: {
    borderWidth: 0.5,
    borderColor: theme.placeholderTextColor,
  },
  captchaPadding: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  captchaContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingRight: 10
  },
  captchaFieldContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  captchaIcon: {
    width: 130,
    height: 50
  },
  refreshCaptchaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  refreshCaptcha: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  greySmallText: {
    color: theme.placeholderTextColor,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  captchaInfo: {
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5,
    textAlign: 'center'
  },
  mb20: {
    marginBottom: 20
  },
  rowOtpSubIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  otpHeaderTitle: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  otpPartSMS: {
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeXL
  },
  otpIcon: {
    paddingLeft: 35,
    paddingTop: 5,
    color: theme.black,
  },
  iconCenter: {
    alignSelf: 'center'
  },
  emailContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20
  },
  inputEmail: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    fontFamily: theme.roboto,
    paddingVertical: 5,
    height: 60,
    color: theme.black,
  },
  containerResend: {
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  dontHaveOTP: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal,
    paddingTop: 15,
    color: theme.black,
  },
  disabledLink: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal,
    paddingTop: 15,
    color: theme.black,
    textDecorationLine: 'underline',
  },
  loginWelcomeSubMessageOTP: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.robotoLight,
    color: theme.black,
    marginBottom: 2,
  },
  loginWelcomeSubMessage: {
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightRegular,
    color: theme.black
  },
  inputOTPContainer: {
    borderBottomColor: theme.black,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  disabledLink2: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal,
    paddingTop: 15,
    color: theme.black,
  },
  resendOtpButton: {
    color: theme.black,
    textDecorationLine: 'underline',
  },
  resendOtp: {
    backgroundColor: 'transparent',
  },
  buttonOtpSubmitSimas: {
    borderColor: theme.black
  },
  successContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center'
  },
  successImage: {
    width: width - 45,
    height: height / 4,
    alignItems: 'center'
  },
  successContent: {
    marginTop: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  successText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    textAlign: 'center'
  },
  successSubText: {
    paddingVertical: 20,
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    lineHeight: 25
  },
  cameraIconStyle: {position: 'absolute', width: 25, right: 0, top: 35},
};