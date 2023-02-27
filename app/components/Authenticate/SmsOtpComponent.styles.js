import {theme, text as textStyles} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';

export default {
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  inputContainer: {
    borderBottomColor: theme.brand,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 10
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
  informationSentTo: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    paddingTop: 10
  },
  mainTitle: {
    fontSize: theme.fontSizeXL,
    paddingVertical: 5,
    color: theme.black,
  },
  dontRecogniseNumberText: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
    paddingRight: 20
  },
  container: [
    styles.contentContainerStyle,
    {
      flex: 1,
      justifyContent: 'space-between',
    }
  ],
  buttonLargeTextStyle: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  rowOtpIcon: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingLeft: 20,
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
  }, styles.contentContainerStyle],
  resendOtp: {
    backgroundColor: '#1bc276',
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
  }, styles.contentContainerStyle],
  containerEasyPin: {
    paddingVertical: theme.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputOTP: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
    color: theme.white,
  },
  inputOTPCOntainer: {
    borderBottomColor: theme.white,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 10,
    paddingHorizontal: 30,
    width: 255,
    justifyContent: 'center',
  },
  loginWelcomeSubMessageOTP: {
    fontSize: theme.fontSizeMedium,
    paddingHorizontal: 20,
    color: theme.white
  },
  otpPartSMS: {
    fontWeight: 'bold',
    fontSize: theme.fontSizeExtraXL
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
};
