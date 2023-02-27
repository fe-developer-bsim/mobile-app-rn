import {theme} from '../../../styles/core.styles';
import {bold, fontSizeMediumStyle} from '../../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 120;

export default {
  inputStyle: {
    height: 30,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: 200,
    color: theme.black
  },
  inputStyleRev: {
    fontSize: 25,
    fontFamily: 'Roboto',
    width: 200,
    padding: 0,
    margin: 0
  },
  inputNote: {
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: 250,
    padding: 0,
    margin: 0
  },
  inputStyleCenter: [bold, {
    height: 30,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    color: theme.darkBlue,
    width: 250,
    padding: 0,
    margin: 0
  }],
  inputStyleCenterSwift: [bold, {
    height: 30,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    color: theme.black,
    width: 250,
    padding: 0,
    margin: 0
  }],
  inputAmount: [bold, {
    height: 30,
    fontSize: 25,
    fontFamily: 'Roboto',
    color: theme.black,
    width: 250,
    padding: 0,
    margin: 0
  }],
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.black
  },
  inputStyleDisabled: {
    height: 30,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: trueWidth
  },
  inputStyleDisabledCenter: {
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: 250,
    padding: 0,
    margin: 0,
    color: theme.darkBlue
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  border: {
  },
  icon: {
    marginRight: 10,
    color: theme.black
  },
  ml5: {
  },
  textRed: {
    color: theme.red
  },
  text: [bold, {
    fontSize: theme.fontSize20,
    fontFamily: 'Roboto',
    color: theme.black
  }]
};