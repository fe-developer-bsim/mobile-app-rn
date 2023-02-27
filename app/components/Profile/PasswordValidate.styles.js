import {theme, text as textStyles} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white'
  },
  columnContainer: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    resizeMode: 'contain'
  },
  verifikasiPasswordText: {
    ...textStyles.h1,
    ...textStyles,
    paddingVertical: theme.padding,
  },
  verifikasiPasswordSubText: {
    color: theme.black
  },
  verifikasiPasswordAlertText: {
    color: theme.black,
    paddingTop: 10,
    paddingVertical: theme.padding,
  },
  loginProblemVerifikasiText: {
    ...textStyles.text,
    ...textStyles.justify,
    paddingVertical: 20,
  },
  resetPasswordVerifikasiText: {
    color: theme.brand
  },
  forgotPasswordContainer: {
    flexDirection: 'row'
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
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: [
    buttonLargeTextStyle
  ]


};
