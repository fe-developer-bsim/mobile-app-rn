import {theme} from '../../styles/core.styles';

export default {
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  spaceContainer: {
    justifyContent: 'space-between',
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
  inputOTPContainer: {
    borderBottomColor: theme.black,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  inputEmail: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
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
  buttonOtpSubmitPage: {
    color: theme.white
  },
  buttonWrapperHorizontal: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
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
  emailContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20
  },
};