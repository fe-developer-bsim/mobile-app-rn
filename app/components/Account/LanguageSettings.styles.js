import {contentContainerStyle, bold, fontSizeXLStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const trueHeight = height;

export default {
  container: [contentContainerStyle, {
  }],
  fullContainer: {
    height: trueHeight,
    backgroundColor: 'white'
  },
  roboto: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  header: {
    marginBottom: 20
  },
  title: [fontSizeXLStyle],
  content: {
    backgroundColor: 'transparent',
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: 40
  },
  menu: {
    marginVertical: 20,
  },
  menuTitle: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  menuTxt: {
    fontWeight: theme.fontWeightLight,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  checked: {
    color: theme.brand,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'    
  },
  textContainer: {
    paddingVertical: 20
  }
};
