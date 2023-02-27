import {theme} from '../../styles/core.styles';

const iconContainer = {
  flex: 1,
  width: 50,
  marginTop: 10,
  bottom: 8,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.red
};
export default {
  iconContainer,
  disabledContainer: {
    ...iconContainer,
    backgroundColor: theme.buttonDisabledBg
  },
  inputIcon: {
    color: theme.white
  }
};
