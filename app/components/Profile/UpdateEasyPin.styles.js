import {theme} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  columnContainer: {
    flex: 1,
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
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: [
    buttonLargeTextStyle
  ]


};
