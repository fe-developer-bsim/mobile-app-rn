import {theme, text as textStyles} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center'
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  button: [
    buttonLargeTextStyle
  ],
  easyPinContainer: {
    alignSelf: 'center',
    borderBottomColor: theme.brand,
    borderBottomWidth: 1,
    width: theme.fontSizeXL * 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20
  },
  appLogoeasypin: {
    width: 22,
    height: 22,
    marginLeft: 5,
    marginTop: 6
  },
  confirmMessage: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    textAlign: 'center',
  },
  appLogoquestion: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    marginTop: 2
  },
  verifyEasyPin: {
    fontSize: theme.fontSizeMedium,
    paddingLeft: 40,
    textAlign: 'center',
    color: theme.black,
  },
  rowEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 40
  },
  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  bodyContainerEasyPin: [{
    flexGrow: 1,
    backgroundColor: theme.brand,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],
  easypinHeaderTitle: {
    ...textStyles.h1,
    color: theme.white,
    paddingBottom: 10
  },
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  containerEasyPin: {
    paddingVertical: theme.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputOTPCOntainer: {
    borderBottomColor: theme.white,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 10,
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  inputOTP: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
    color: theme.white,
  },
  buttonOtpSubmit: {
    paddingBottom: 20,
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },
};
