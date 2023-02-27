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
    height: 45,
    fontSize: theme.fontSize22,
    fontFamily: theme.roboto,
    width: trueWidth,
    fontWeight: 'bold',
    color: theme.black
  },
  inputStyleFocusQr: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth,
    marginTop: 10,
    marginBottom: -5,
    color: theme.black
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
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
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
  text: [bold, {
    fontSize: theme.fontSize20,
    fontFamily: theme.roboto,
    color: theme.black
  }],
  borderTax: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: theme.white
  },
  inputStyleFocusTax: {
    height: 50,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    width: trueWidth * 0.9,
    marginTop: 20,
    marginBottom: -5,
    fontWeight: 'bold',
    color: theme.black
  },
  containerInputBoxTTS: {
    paddingVertical: 7,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: theme.darkBlue,
    marginVertical: 5
  },
};
