import {theme} from '../../../styles/core.styles';

export default {
  input: {
    plain: {
      fontSize: theme.fontSizeNormal,
      color: theme.text,
      padding: 7,
      height: 47,
      fontWeight: theme.fontWeightLight
    },
    primary: {
      fontSize: theme.fontSizeMedium,
      color: theme.text,
      padding: 10,
      height: 50,
      fontWeight: theme.fontWeightLight
    }
  },
  container: {
    plain: {
      borderColor: theme.grey,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: theme.background
    },
    primary: {
      marginTop: 10,
      backgroundColor: theme.inputBackground
    }
  },
  inputStyle: {
    fontSize: theme.fontSizeXL,
    color: theme.text,
  },
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.softGrey
  },
  inputStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    color: theme.text,
    fontWeight: theme.fontWeightLight,
    borderColor: theme.softGrey
  },
  inputStyleCenter: {
    fontSize: theme.fontSizeXL,
    color: theme.text,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};
