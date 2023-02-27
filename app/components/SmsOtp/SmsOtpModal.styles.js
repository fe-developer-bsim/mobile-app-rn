import {theme, text as textStyles} from '../../styles/core.styles';

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
    textDecorationLine: 'underline',
  },
  dontHaveOTP: {
    ...textStyles.text,
    paddingTop: 15,
    color: theme.white,
  },
  dontRecognizeNumber: {
    alignItems: 'center',
  },
  informationSentTo: {
    textAlign: 'center',
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    paddingTop: 10
  },
  mainTitle: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    padding: 5,
    color: theme.black,
  },
  dontRecogniseNumberText: {
    color: theme.red,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center',
  },
  otpDetail: {
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
