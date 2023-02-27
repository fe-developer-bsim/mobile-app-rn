import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

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
    marginTop: 20,
    marginHorizontal: 20
  },
  mainTitleTxt: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
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
    marginBottom: 15,
    padding: 10,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    width: width - 100
  },
  sectionTitleDisabled: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    width: width - 100
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
    fontFamily: theme.roboto,
  },
  mainTitleText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto,
    marginBottom: 20
  },
  mainTitleTextCenter: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto,
    marginBottom: 20,
    textAlign: 'center'
  },
  mainContentText: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto,
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
    color: theme.red,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10,
    fontWeight: theme.fontWeightBold
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 30,
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
    paddingTop: 5,
  },
  captchaBorder: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
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
  loanAmountContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rpText: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  amountText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    bottom: 20
  },
  minimumAmount: {
    alignItems: 'flex-start'
  },
  maximumAmount: {
    alignItems: 'flex-end'
  },
  amount: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
    color: theme.textGrey
  },
  fieldComponentLoan: {
    position: 'absolute',
    width: 130,
    right: 0,
    top: -3,
  },
  loanLeftText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
  },
  loanRightText: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  loanRightTextRed: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    color: theme.brand,
    fontWeight: theme.fontWeightBold
  },
  pt20: {
    paddingTop: 20
  },
  dropdownText: {
    textAlign: 'right'
  },
  columnCenter: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowCenterFee: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  borderGreyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 20,
  },
  textPickerStyle: {
    textAlign: 'right'
  },

  // for field with image 
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 10, top: 17},
  // end of
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    padding: 30,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContainer: {
    marginBottom: 20
  },
  successTitleEmoneyCont: {
    paddingHorizontal: 15
  },
  successTitleEmoney: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightMedium,
    textAlign: 'left',
    marginBottom: 30
  },
  successSubtitleEmoney: {
    paddingVertical: 20,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    lineHeight: 25
  },
  successSubtitleEmoneyBold: {
    paddingVertical: 20,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    lineHeight: 25
  },
  successContainerEmoney: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  successImageEmoney: {
    width: width - 45,
    height: height / 2.8,
    alignItems: 'center'
  },
  agreementContainer: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  buttonTNCContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  nextButton: styles.buttonLargeTextStyle,
  calcButton: {
    width: 120,
    marginBottom: 20,
  },
  buttonCalcContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70,
  },
  buttonLeft: {
    flex: 1,
    paddingRight: 10
  },
  buttonRight: {
    flex: 1,
    paddingLeft: 10
  },
  greyFullLine: {
    backgroundColor: theme.grey,
    height: 1,
    marginTop: 5,
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    width: 50
  },
  simulationDetailContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  txtInfoTop: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },
  txtInfoBottom: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeXS,
    color: theme.black
  },
  summaryDetailContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  mb30: {
    marginBottom: 30
  },
  txtInfoTopRight: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    width: 150,
    textAlign: 'right'
  },
  destinationText: {
    marginTop: 10,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightNormal,
  },
  rdButton: {
    paddingRight: 30
  }
};