import {contentContainerStyle, borderGreyStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 80;

export default {
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  labelSpacing: {
    paddingVertical: 14
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  row2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  purchase: {
    color: theme.purchase,
  },
  mr10: {
    marginRight: 10
  },
  inputTxt: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: borderGreyStyle.borderColor,
    height: 50,    
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 58,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 50,
  },
  inputAcc: {
    flex: 1,
    paddingLeft: 20,
    bottom: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: borderGreyStyle.borderColor,
    marginLeft: 20,
    height: 50,
  },
  arrow: {
    color: theme.brand,
    marginTop: 10
  },
  arrowDisable: {
    color: theme.buttonDisabledBg,
    marginTop: 10
  },
  inputCont: {
    width: trueWidth
  }
};
