import {theme} from '../../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {bold} from '../../../styles/common.styles';
const trueWidth = (50 * width) / 100;

export default {
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.softGrey,
    transparent: theme.transparent
  },
  inputStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    color: theme.text,
    fontWeight: theme.fontWeightLight,
    borderColor: theme.softGrey
  },
  containerRow: {
    borderColor: theme.greyLine,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLabel: {
    width: 15 * width / 100,
    alignItems: 'center',
  },
  middleLabel: {
    width: 50 * width / 100,
    height: 50,
  },
  lastLabel: {
    width: 10 * width / 100,
  },
  containerOutter: {
  },
  roundedText: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.grey,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: theme.green
  },
  textRound: {
    color: theme.white,
    fontSize: theme.fontSize20,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  resize: {
    fontSize: 50,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.greyLine
  },
  inputStyleCenter: [bold, {
    height: 30,
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black,
    width: trueWidth,
  }],
  LinearGradient: {
    height: 5
  },
  borderShadow: {
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: theme.greyLine,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 5,
    marginTop: 20
  },
  amount: {
    color: theme.amount
  }

};
