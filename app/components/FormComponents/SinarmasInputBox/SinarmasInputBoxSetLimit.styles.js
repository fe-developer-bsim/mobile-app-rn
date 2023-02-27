import {theme} from '../../../styles/core.styles';
import {bold} from '../../../styles/common.styles';

export default {
  inputStyle: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
  },
  inputStyleCenter: [bold, {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black
  }],
  tintColor: {
    textInput: '#000000',
    successTextInput: '#000000',
    disabled: theme.black
  },
  inputStyleDisabled: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    color: theme.black

  },
  inputStyleDisabledCenter: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black
  },
  row: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    color: theme.black
  },
  ml5: {
    marginLeft: 5
  },
  textRed: {
    color: theme.red
  },
  text: [bold, {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  leftIconImage: {
    width: 30,
    height: 30
  }
};
