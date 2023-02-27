import {theme, text as textStyles} from '../../styles/core.styles';

export default {
  container: {
    paddingVertical: theme.padding,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  easyPinContainer: {
    borderBottomColor: theme.brand,
    borderBottomWidth: 1,
    width: theme.fontSizeXL * 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  errorContainer: {
    paddingVertical: theme.padding,
    alignSelf: 'center',
  },
  errorContainerVerify: {
    paddingVertical: 10,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: theme.padding,
  },
  loginProblemText: {
    ...textStyles.text,
    ...textStyles.justify
  },
  resetPasswordText: {
    color: theme.brand
  },
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
    paddingHorizontal: 30,
    width: 265,
    justifyContent: 'center',
  },
  loginProblemTextEP: {
    ...textStyles.text,
    ...textStyles.justify,
    color: theme.white,
  },
  containerDetail: {
    paddingVertical: theme.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: theme.white,
  },
};
