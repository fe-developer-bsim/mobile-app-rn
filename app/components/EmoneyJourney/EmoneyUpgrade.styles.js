import {bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white
  },
  goldContainer: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  greyLine: {
    flex: 1,
    width: 1,
    backgroundColor: theme.grey,
  },
  filler: {
    flex: 1,
    width: 1,
  },
  greyLineBottom: {
    flex: 1,
    width: 1,
    backgroundColor: theme.grey,
    paddingBottom: 30
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.black
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: width - 20,
  },
  rowPadding: {
    padding: 20
  },
  leftContainer: {
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 5,
    paddingBottom: 30
  },
  iconContainer: {
    flex: 5,
  },
  title: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    backgroundColor: theme.transparent
  },
  bottomContainer: {
    paddingHorizontal: 20
  },
  rowImg: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: width,
    height: height / 1.7,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  simasImg: {
    width: width / 2.3,
    height: height / 4.5,
  },
  simasIcon: {
    color: theme.white,
    marginLeft: 20
  },
  imageTextContainer: {
    flexDirection: 'row'
  },
  imageText: {
    backgroundColor: theme.transparent,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeMedium,
    lineHeight: 20,
  },
  number: {
    width: 25,
    alignItems: 'center',
    paddingLeft: 10
  },
  imageTextPadding: {
    paddingLeft: 5,
    flex: 1
  },
  titleContainer: {
    paddingBottom: 20
  },
  bold: {
    backgroundColor: theme.transparent,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold
  },
  steps: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'Roboto',
  },
  imageSekuritas: {
    width: 100,
    height: 35,
    resizeMode: 'contain'
  },
  arrowIcon: {
    marginLeft: -4,
    alignItems: 'flex-start',
    marginBottom: 5
  },
  rowTxt: {
    flexDirection: 'row',
  },
  simasTxt: [bold, {
    color: theme.white,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeMedium,
  }],
  simasTxtTitle: [bold, {
    color: theme.white,
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
  }],
  titleCont: {
    marginBottom: 10
  },
  txtCont: {
    marginVertical: 20
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
  spaceContainer: {
    justifyContent: 'space-between',
  },
  spaceContainerIndex: {
    marginTop: 30,
    justifyContent: 'space-between',
  },

  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  mainTitleText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSize20,
    textAlign: 'center',
    marginBottom: 20
  },
  subtitleText: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal,
    textAlign: 'center',
    marginBottom: 20
  },
  benefitTxt: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    marginLeft: 10,
    width: width - 120,
    alignSelf: 'center'
  },
  benefitIcon: {
    color: theme.brand,
    alignSelf: 'center',
    marginTop: 3
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  cameraContainer: {
    paddingHorizontal: 20
  },
  benefitImage: {
    marginTop: 10,
    width: width,
    height: width / 1.3,
    alignItems: 'center'
  },
  mainContent: {
    marginTop: 30,
    alignItems: 'center'
  },
  buttonWrapperHorizontal: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
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
  box: {
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
  arrIcon: {
    color: theme.brand,
    alignSelf: 'center'
  },
  successIcon: {
    color: theme.green,
    alignSelf: 'center'
  },
  failIcon: {
    color: theme.red,
    alignSelf: 'center'
  },
  info: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
  },
  disabledInfo: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.robotoLight,
    width: width - 100,
  },
  disabledArrIcon: {
    color: theme.grey,
    alignSelf: 'center'
  },
  successContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  successImage: {
    width: width / 1.3,
    height: width / 1.3,
    alignSelf: 'center',
    marginTop: 20
  },
  successContent: {
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
  successBold: {
    fontWeight: theme.fontWeightRegular
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
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
  inputOTPContainer: {
    borderBottomColor: theme.black,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  buttonOtpSubmitPage: {
    color: theme.white
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
  paddingHeader: {
    padding: 30
  },
};
