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
    fontSize: theme.fontSizeNormal,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    textAlign: 'right'
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
    textAlign: 'right'
  },

  currencyText: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight, 
    paddingHorizontal: 0,
  },
  iconEdit: {
    color: theme.black,
    paddingHorizontal: 20,
  },
  complexField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    width: 100
  },
  inputWrapper: {
    flex: 1,
    paddingBottom: 90,
  },
  textRp: {
    
  }
};
