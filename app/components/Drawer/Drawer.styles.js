import {contentContainerStyle, bold, fontSizeMediumStyle, fontSizeNormaltyle, fontSizeSmallStyle, fontSizeXSStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {Platform} from 'react-native';
const {width} = Dimensions.get('window');
const offsetWidth = width - (width * 0.166); // 5:1 screen ratio

export default {
  headingSection: {
    backgroundColor: theme.white
  },
  name: [fontSizeMediumStyle, {
    color: theme.lightBlack,
    paddingVertical: 5,
    fontFamily: 'roboto'
  }],
  userInfo: [fontSizeNormaltyle, {
    color: theme.lightBlack,
    fontWeight: theme.fontWeightLight
  }],
  userInfoBold: [bold, fontSizeNormaltyle, {
    color: theme.lightBlack
  }],
  smallWhiteText: [fontSizeSmallStyle, {
    color: theme.lightBlack
  }],
  whiteLine: {
    borderTopColor: theme.grey,
    width: offsetWidth - 40,
    borderTopWidth: 1
  },
  appVersion: [fontSizeSmallStyle, {
    color: theme.lightBlack,
    paddingTop: 10
  }],
  container:
  {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between'
  },
  buttonContainer: {
    paddingHorizontal: 20
  },
  navigationContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  arrowIcon: {
    color: theme.lightBlack
  },
  language: [fontSizeNormaltyle, {
    color: theme.lightBlack
  }],
  languageBold: [bold, fontSizeNormaltyle, {
    color: theme.lightBlack
  }],
  darkHeading: {
    backgroundColor: theme.white,
    height: Platform.OS === 'ios' ? 130 : 139,
    width: offsetWidth,
    position: 'absolute'
  },
  darkContainer: {
    borderBottomWidth: 0.5,
    borderColor: theme.grey,
    backgroundColor: theme.white,
    flex: 1
  },
  arrowContainer: {
    paddingRight: 5
  },
  logoContainer: {
    paddingBottom: 10,
    marginLeft: -5
  },
  additionalPadding: {
    paddingVertical: 5
  },
  contentContainer: [contentContainerStyle],
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  row: {
    flexDirection: 'row'
  },
  groupContainer: {
    paddingVertical: 10
  },
  textGroup: [bold, fontSizeNormaltyle, {
    color: theme.lightBlack
  }],
  logoImage: {
    width: 166,
    height: 40,
  },
  picture: {
    width: 51,
    height: 50.5,
    borderRadius: 25
  },
  wrapPicture: {
    marginTop: 20,
    flexDirection: 'row',      
  },
  profileTextContainer: {
    paddingLeft: 15,
    alignItems: 'flex-start'    
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.greyLine,
    borderRadius: 20,
  },
  touchableRowPoin: {
    borderColor: 'white',
    flex: 2,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: 10
  },
  iconStyleRed: {
    color: theme.brand
  },
  poinImage: {
    height: 12,
    width: 30
  },
  footerTouchable: {
    backgroundColor: theme.white,
    borderRadius: 100,
    elevation: 2,
    shadowOffset: {width: 3, height: 3},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 10
  },
  logoutText: [
    bold,
    {color: theme.brand,
      fontFamily: 'roboto'
    }
  ],
  cartRed: {
    borderRadius: 15,
    height: 14,
    width: 27,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: -7
  },
  newMenuText: [fontSizeXSStyle, bold, {
    color: theme.white,
    fontFamily: 'roboto',
    marginBottom: 2
  }],
  newMenuContainer: {
    flexDirection: 'row',    
  },
  newSplitBillContainer: {
    flexDirection: 'row',
  },
  newSplitBill: {
    backgroundColor: theme.brand,
    height: 15,
    width: 30,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: -5,
  },
  newSplitBillText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    marginTop: -2,
  },
  fastCodeIcon: {
    marginBottom: 2,
    color: theme.red,
  }
};
