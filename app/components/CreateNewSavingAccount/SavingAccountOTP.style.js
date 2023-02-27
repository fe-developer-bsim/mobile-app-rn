import {theme} from '../../styles/core.styles';

export default {
  bodyContainerOTP: {
    flexGrow: 1,
    backgroundColor: '#1bc276',
    justifyContent: 'space-between',
    paddingBottom: -10,
    padding: 20
  },
  columnContainer: {
    flex: 1,
  },
  rowOtpSubIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  rowOtpIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    padding: 20,
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
  buttonOtpSubmit: {
    paddingBottom: 20,
    paddingTop: 20
  },
  buttonOtpSubmitSimas: {
    borderColor: theme.black
  },
  resendOtp: {
    backgroundColor: 'transparent',
  },

  otpHeaderTitle: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXL,
    color: theme.white
  },
  loginWelcomeSubMessageOTP: {
    fontSize: theme.fontSizeMedium,
    paddingHorizontal: 20,
    color: theme.white
  },
  dontRecogniseNumberText: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
    paddingRight: 20
  },
  inputOTP: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
    color: theme.white,
  },
  dontHaveOTP: {
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightRegular,
    fontSize: theme.fontSizeNormal,
    paddingTop: 15,
    color: theme.white,
  },
  disabledLink: {
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightRegular,
    fontSize: theme.fontSizeNormal,
    paddingTop: 15,
    color: theme.white,
    textDecorationLine: 'underline',
  },
  resendOtpButton: {
    color: theme.white,
    textDecorationLine: 'underline',
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },

  otpIcon: {
    paddingLeft: 35,
    paddingTop: 5,
    color: theme.white,
  },
  containerResend: {
    paddingLeft: 20
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
  otpPartSMS: {
    fontWeight: 'bold',
    fontSize: theme.fontSizeExtraXL
  },
  modalTextLeftContainer: {
    marginHorizontal: 5
  },
  modalTextRightContainer: {
    marginRight: 30,
  },
};
