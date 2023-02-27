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
    color: theme.black
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
    borderColor: theme.softGrey
  },
  icon: {
    marginRight: 10,
    color: theme.black
  },
  ml5: {
    marginLeft: 10
  },
  text: [bold, {
    fontSize: theme.fontSize20,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  leftIconImage: {
    marginLeft: 5,
    marginRight: -5,
    width: 30,
    height: 30
  },
  containerIconSearch: {
    marginHorizontal: width * 0.049,
  },
  containerIconClose: {
    alignSelf: 'center',
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.softGrey,
    marginLeft: 10,
  },
  closeIcon: {
    color: theme.white
  },
  rowSearch: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ml20: {
    marginLeft: -5
  },
};