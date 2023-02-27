import {contentContainerStyle, fontSizeXLStyle, fontSizeLargeStyle, fontSizeSmallStyle, fontSizeNormalStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;

export default {
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  redContainer: [contentContainerStyle, {
    backgroundColor: theme.brand,
  }],
  whiteContainer: [contentContainerStyle, {
  }],
  helpContainer: {
    backgroundColor: theme.white
  },
  logoImage: {
    width: 85,
    height: 33,
    marginTop: 25,
    marginBottom: 25
  },
  successTxt: [fontSizeXLStyle, {
    marginBottom: 5,
  }],
  successTxt2: [fontSizeLargeStyle, {
  }],
  whiteUnderlineText: {
    textDecorationLine: 'underline'
  },
  whiteText: [fontSizeSmallStyle, {
  }],
  info: {
    marginTop: 30,
  },
  info2: {
    marginTop: 20
  },
  info3: {
    marginTop: 17,
    marginBottom: 70
  },
  txt: [fontSizeMediumStyle, {
  }],
  regCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bulletIcon: {
    paddingTop: 10,
    color: theme.brand,
  },
  depturnView: {
    marginBottom: 10
  },
  depturnTxt: [fontSizeLargeStyle, {
    color: theme.lightGrey,
  }],
  receiptTxt: [fontSizeXLStyle, bold, {
  }],
  purchaseTxt: [fontSizeMediumStyle, {
  }],
  sourceTxt: [fontSizeSmallStyle, {
    color: theme.lightGrey,
  }],
  priceTxt: [fontSizeLargeStyle, bold, {
    color: theme.brand,
  }],
  mt10: {
    marginTop: 10
  },
  buttonAgree: {
    backgroundColor: theme.white,
    padding: 20,
  },
  greyLine2: {
    backgroundColor: theme.cardGrey,
    height: 5,
  },
  greyLine: {
    backgroundColor: theme.cardGrey,
    height: 1,
    marginVertical: 10
  },
  infoTxt1: [fontSizeNormalStyle, {
    marginBottom: 15,
    color: theme.textGrey
  }],
  infoTxt2: [fontSizeNormalStyle, {
    marginBottom: 20,
    color: theme.textGrey
  }],
  infoTxt3: [fontSizeSmallStyle, {
    color: theme.textGrey
  }],
  footerTextRed: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto',
  },
  contentCont: {
    marginVertical: 10
  },
  headTxt: {
    paddingBottom: 2
  },
  valueTxt: [bold, {
  }],
  mt40: {
    marginTop: 40
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconView: {
    marginRight: 10
  },
  imageFlight: {
    width: 40,
    height: 40
  },
  typeTxt: {
    color: theme.lightGrey,
    marginVertical: 2
  },
  mv10: {marginVertical: 10},
  flNumberTxt: [bold, {
    marginTop: -19,
  }],
  proceedIcon: {
    color: theme.brand,
    marginTop: -40,
  },
  originTxt: [fontSizeXLStyle, bold, {

  }],
  arriveTime: {
    color: theme.lightGrey
  },
  locTxt: [fontSizeSmallStyle],
  row2: {
    flexDirection: 'row',
  },
  dtimeTxt: {
    marginVertical: 5
  },
  directTxt: {
    color: theme.lightGrey
  },
  wd50: {
    width: trueWidth / 2,
  },
  wd40: {
    width: trueWidth / 2.5,
  },
  wd20: {
    width: trueWidth / 20,    
  },
  wd10: {
  },
  mv5: {
    marginVertical: 5
  },
  plusIcon: {
    color: theme.green
  },
  date: {
  },
  logoFail: {
    paddingTop: 30,
    color: theme.grey
  },
};
