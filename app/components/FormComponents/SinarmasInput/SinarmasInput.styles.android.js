import {theme} from '../../../styles/core.styles';
import {bold} from '../../../styles/common.styles';

export default {
  input: {
    plain: {
      fontSize: theme.fontSizeNormal,
      color: theme.text,
      marginHorizontal: -5,
      fontWeight: theme.fontWeightLight,
    },
    primary: {
      fontSize: theme.fontSizeNormal,
      color: theme.text,
      padding: 10,
      fontWeight: theme.fontWeightLight
    }
  },
  container: {
    plain: {
      borderColor: theme.grey,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: theme.background,
    },
    primary: {
      marginTop: 10,
      backgroundColor: theme.inputBackground
    }
  },
  inputStyle: {
    fontSize: theme.fontSizeNormal,
    color: theme.text,
    fontWeight: theme.fontWeightLight,
  },
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.softGrey
  },
  inputStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    color: theme.softGrey,
    fontWeight: theme.fontWeightLight,
  },
  inputStyleCenter: [bold, {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    textAlign: 'center',
    fontFamily: 'Roboto',
  }],
  inputStyleR: [bold, {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    textAlign: 'left',
    fontFamily: 'Roboto',
    borderWidth: 0
  }],
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};