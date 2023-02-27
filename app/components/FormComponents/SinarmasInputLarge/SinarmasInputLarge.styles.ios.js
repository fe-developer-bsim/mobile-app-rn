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
    fontSize: theme.fontSize20,
    color: theme.text,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center'
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
    borderWidth: 1,
    borderColor: theme.greyLine,
    borderRadius: 10,
    height: 60
  },
  inputWrapper: {
    flex: 1,
  },
  complexFieldWithoutBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  currencyTextWithoutBorder: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    textAlign: 'right',
    color: theme.black,
  },
  inputStyleWithoutBorder: {
    fontSize: theme.fontSizeXL,
    color: theme.text,
    fontWeight: theme.fontWeightBold,
  },
};
