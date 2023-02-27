import {theme} from '../../../styles/core.styles';
import {bold, fontSizeMediumStyle} from '../../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 120;

export default {
  inputStyle: [bold, {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
    color: theme.black,
    fontWeight: theme.fontWeightRegular
  }],
  inputStyleFocus: [bold, {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth,
    color: theme.black,
    marginTop: 10,
    marginBottom: -5,
    fontWeight: theme.fontWeightRegular
  }],
  inputStyleFocusNew: [bold, {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
    color: theme.darkBlue
  }],
  inputStyleCenter: [bold, {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: theme.roboto,
    textAlign: 'center',
    width: trueWidth,
    color: theme.black
  }],
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.softGrey
  },
  inputStyleDisabled: {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: theme.roboto,
    width: trueWidth
  },
  inputStyleDisabledCenter: {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: theme.roboto,
    textAlign: 'center',
    width: trueWidth
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  border: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    marginVertical: 5
  },
  icon: {
    color: theme.black
  },
  text: [bold, {
    fontSize: theme.fontSize20,
    fontFamily: theme.roboto,
    color: theme.black
  }],
  borderRemittance: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.darkOrange,
    marginVertical: 5
  },
};
