import {theme} from '../../../styles/core.styles';

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
    fontSize: theme.fontSizeLarge,
    color: theme.text,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
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

  currencyText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold, 
    paddingHorizontal: 20,
  },
  iconEdit: {
    color: theme.black,
    paddingHorizontal: 20,
  },
  complexField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 60,
    width: 110
  },
  inputWrapper: {
    flex: 1,
  },
};
