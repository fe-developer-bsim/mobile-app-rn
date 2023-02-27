import {bold, fontSizeMediumStyle} from '../../../styles/common.styles';

import {Dimensions} from 'react-native';
import {theme} from '../../../styles/core.styles';

const {width} = Dimensions.get('window');
const trueWidth = width - 120;

export default {
  inputStyle: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
  },
  inputStyleFocus: {
    height: 50,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
  },
  inputStyleFocusAmount: {
    height: 45,
    fontSize: theme.fontSize22,
    fontFamily: theme.roboto,
    width: trueWidth,
    fontWeight: 'bold'
  },
  inputStyleFocusTax: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth * 0.9,
    marginTop: 20,
    marginBottom: -5,
    fontWeight: 'bold',
  },
  inputStyleFocusQr: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
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
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
    color: theme.darkBlue
  },
  inputStyleDisabledCenter: {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: theme.roboto,
    textAlign: 'center',
    width: trueWidth
  },
  borderTax: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: theme.white
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  rowAmount: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
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
  ml5: {
    marginLeft: 10
  },
  textRed: {
    color: theme.red
  },
  text: [bold, {
    fontSize: theme.fontSize20,
    fontFamily: theme.roboto,
    color: theme.black
  }],
  containerInputBoxTTS: {
    paddingVertical: 7,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: theme.darkBlue,
    marginVertical: 5
  },
};
