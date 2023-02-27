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
  pinFill: {
    color: theme.brand
  },
  pinOutline: {
    position: 'absolute',
    color: theme.black
  },
  passFill: {
    color: '#7FF2A8'
  },
  passOutline: {
    position: 'absolute',
    color: theme.black
  },
  gearFill: {
    color: '#FCC86F'
  },
  gearOutline: {
    position: 'absolute',
    color: theme.black
  },
  langFill: {
    color: '#ADF9FF'
  },
  arrow: {
    color: theme.black
  },
  menuTxtWrap: {
    fontWeight: theme.fontWeightLight,
    flex: 1,
    flexWrap: 'wrap'
  },
  iconContainer: {
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
};
