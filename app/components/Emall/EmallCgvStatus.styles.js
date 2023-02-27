import {contentContainerStyle, fontSizeXLStyle, fontSizeLargeStyle, fontSizeSmallStyle, fontSizeNormalStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
  },
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
    backgroundColor: theme.white
  }],
  helpContainer: {
    backgroundColor: theme.white
  },
  messContainer: {
  },
  logoImage: {
    width: 85,
    height: 33,
    marginTop: 25,
    marginBottom: 25
  },
  successTxt: [fontSizeXLStyle, {
  }],
  successTxt2: [fontSizeLargeStyle, {
  }],
  whiteUnderlineText: {
    color: theme.white,
    textDecorationLine: 'underline'
  },
  whiteText: [fontSizeSmallStyle, {
  }],
  row: {
    flexDirection: 'row'
  },
  info: {
    marginTop: 26,
    marginBottom: 2
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
  checkContainer: {
  },
  plusIcon: {
    color: theme.green
  },
  bulletIcon: {
    paddingTop: 10,
    color: theme.brand,
  },
  bookingTxt: [fontSizeNormalStyle, {
    fontWeight: '300'
  }],
  bookingTxt2: [fontSizeXLStyle, bold, {
    color: theme.brand,
  }],
  buttonAgree: {
    backgroundColor: theme.white,
    padding: 20,
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginVertical: 10,
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
  date: {
  },
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
  logoFail: {
    color: theme.grey
  },
  rcpTxt: {
    color: theme.black,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
  },
  amountTitle: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight
  },
  amountText: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  sourceAccount: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  },
  account: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
};
