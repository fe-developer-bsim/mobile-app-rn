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
    fontSize: theme.fontSizeSmall,
    color: theme.text,
    fontWeight: theme.fontWeightLight,
    textAlign: 'left',
    borderBottomWidth: 2,
    borderColor: theme.grey,
  },
  inputStyle2: {
    fontSize: theme.fontSizeSmall,
    color: theme.text,
    fontWeight: theme.fontWeightLight,
    textAlign: 'left',
    borderBottomWidth: 2,
    borderColor: theme.brand,
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
    borderWidth: 1,
    borderColor: theme.transparent,
    borderRadius: 10,
    height: 60,
    width: 120

  },
  inputWrapper: {
    flex: 1,
  },
};
