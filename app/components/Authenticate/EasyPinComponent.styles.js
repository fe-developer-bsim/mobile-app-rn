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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  subTextNotification: {
    color: theme.red,
    paddingHorizontal: 10,
  },
  mainTitle: {
    padding: 5
  },
  mainTitleResetPin: {
    fontSize: 12,
  },
  appLogoeasypin: {
    width: 22,
    height: 22,
    marginLeft: 5,
    marginTop: 5
  },
  appLogoquestion: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  mainTitleAttempts: {
    justifyContent: 'center',
    padding: 5,
    alignItems: 'flex-start',
  },
  mainTitleAttemptstext: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    padding: 25
  },
  easyPinText: {
    padding: 5,
    color: theme.grey,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
  },
  resetEasyPinText: {
    padding: 5,
    textAlign: 'center',
    color: theme.red,
    fontSize: theme.fontSizeSmall,
  },
  mainTitleInfoEasyPin: {
    color: theme.black,
    fontSize: theme.fontSizeMedium
  },
  rowEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingRight: 20
  },
  container: [
    styles.contentContainerStyle,
    styles.containerWhiteStyle,
    {
      flex: 1,
      justifyContent: 'space-between',
    }
  ],
  buttonLargeTextStyle: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20
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
    ...textStyles.h1,
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
  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  verifyEasyPin: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
    paddingHorizontal: 30
  },
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  rowEasyPINFormatRev: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  rowEasyPINRev: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 14,
    paddingRight: 10,
    justifyContent: 'center',
  },
  inputOTPCOntainerRev: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingHorizontal: 30,
    width: 255,
    justifyContent: 'center',
  },
  noticeEasyPin: {
    color: theme.white,
  },
  rowEasyPINRev2: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  rowSecureCode: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingTop: 100,
    paddingRight: 10,
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 30
  },
  loginProblemTextEP: {
    ...textStyles.text,
    ...textStyles.justify,
    color: theme.white,
  },
  forgotEasyPinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
};
