import {theme} from '../../../styles/core.styles';
import {bold, fontSizeMediumStyle} from '../../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 120;

export default {
  inputStyle: {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: trueWidth,
  },
  inputStyleCenter: [bold, {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
    width: trueWidth
  },
  inputStyleDisabledCenter: {
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    textAlign: 'center',
    width: trueWidth
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey
  },
  icon: {
    marginRight: 10,
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
    fontFamily: 'Roboto',
    color: theme.black
  }]
};
