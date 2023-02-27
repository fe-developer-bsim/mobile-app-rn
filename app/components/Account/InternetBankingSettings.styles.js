import {contentContainerStyle, fontSizeXLStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
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
    paddingVertical: 25,
  },
  menuTitle: {
    fontSize: theme.fontSize20
  },
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
  cautionFill: {
    color: theme.darkBlue
  },
  arrow: {
    color: theme.black
  },
  menuTxtWrap: {
    fontWeight: theme.fontWeightLight,
    flex: 1,
    flexWrap: 'wrap'
  },
  tipsBox: {
    borderColor: theme.grey,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tipsBoxText: {
    width: width * 0.75,
  },
  tipsTxt: {
    fontWeight: theme.fontWeightLight,
    fontFamily: 'Roboto',
    color: theme.darkBlue,
    paddingVertical: 10
  },
  cautionMargin: {
    marginBottom: 60,
  },
  iconContainer: {
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  switchRight: {
    paddingRight: 10
  }
};
