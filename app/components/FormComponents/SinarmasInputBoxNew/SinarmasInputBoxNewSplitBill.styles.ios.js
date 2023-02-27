import {theme} from '../../../styles/core.styles';
import {bold, fontSizeMediumStyle} from '../../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 120;

export default {
  inputStyle: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
    color: theme.black,
    fontWeight: theme.fontWeightRegular
  },
  inputStyleFocus: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth,
    color: theme.black,
    marginTop: 10,
    marginBottom: -5,
    fontWeight: theme.fontWeightRegular
  },
  inputStyleFocusAmount: {
    height: 50,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    width: trueWidth,
    // marginTop: 10,
    marginBottom: -5,
    paddingHorizontal: 50
  },
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
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginBottom: -5,
    paddingHorizontal: 50,
    color: theme.black
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
  labelAmount: {
    paddingTop: 10,
    marginBottom: -10,
    color: theme.blueText,
    fontFamily: 'roboto',
    paddingHorizontal: 50,
  },
  inputStyleFocusNew: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
    color: theme.darkBlue,
    paddingRight: 25
  },
};
