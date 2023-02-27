import {theme, text as textStyles} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  },
  offersContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  buttonFindDeals: {
    backgroundColor: theme.white,
    marginVertical: 5,
    marginRight: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonScanPromo: {
    backgroundColor: theme.brand,
    marginVertical: 5,
    borderRadius: 50,
    paddingRight: 20,
    paddingLeft: 5,
    paddingVertical: 5,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonPromoContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  buttonLogin: {
    paddingHorizontal: 20,
  },
  bankLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  bankSinarmasLogo: {
    width: 166,
    height: 40,
  },
  appBrandingContainer: {
    justifyContent: 'center',
  },
  appLogo: {
    width: 136,
    height: 51,
    marginBottom: 10
  },
  appTitle: [
    textStyles.h2,
    {
      fontWeight: theme.fontWeightMedium
    }
  ],
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.brand,
    marginVertical: 10,
    width: 136,
  },
  appSubtitleContainer: {
    paddingRight: 50,
  },
  callContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 10
  },
  redSmallText: {
    color: theme.brand,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  greySmallText: {
    textAlign: 'center',
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall
  },
  topContainer: {
    flexDirection: 'row'
  },
  languageContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  languageButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0
  },
  languageButton: {
    padding: 10,
  },
  textBold: {
    fontWeight: theme.fontWeightBold
  },
  languageDivider: {
    borderWidth: 1,
    height: 15,
  },
  bottomContainer: {
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  footerText: {
    paddingTop: 5,
    textAlign: 'center'
  },
  underlineText: {
    textAlign: 'center',
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline'
  },
  textstyle: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  formHeader: {
    paddingTop: 15,
    borderColor: theme.grey,
  },
  styleMessage:
  {
    color: theme.black},
  containerContent: [{flexGrow: 1, paddingBottom: 10,  backgroundColor: theme.white, marginHorizontal: -20, marginTop: -20}],
  iconDiscount: {
    paddingRight: 5,
    color: theme.black
  },
  iconScan: {
    paddingRight: 5,
    color: theme.white
  },
  findNearby: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
  },
  scanPromo: {
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    paddingRight: 20
  },
  paymentContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    color: 'black',
    elevation: 2,
    shadowRadius: 2,
    shadowColor: theme.grey,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.78
  },
  offerAndInfo: {
    height: 30,
    flex: 1
  },
  containerBillpay: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.white,
    marginHorizontal: width * 0.049,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: width * 0.59,
  },
  borderBillpay: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? 0.3 * 0.5 * width : 0.3 * 0.55 * width,
    paddingHorizontal: 5,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  showQR: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? 0.3 * 0.5 * width : 0.3 * 0.55 * width,
    paddingHorizontal: 5,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 5,

  },
  iconBlack: {
    color: theme.red
  },

  touchableRow: {
    alignItems: 'center',
    height: height / 6,
    borderColor: 'transparent',
    flex: 0.5,
    borderWidth: 0.5,
    paddingVertical: 10,
  },

  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: Platform.OS === 'ios' ? 2 :  10,
  },
  containerReload: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  columnBalance: {
    flex: 2
  },
  tes: {
    width: (width - (width * 0.05)) - 160,
  },
  buttonContainer: {
    flex: Platform.OS === 'android' ? 7 : height > 750 ? 7 : 5
  },
  touchableRowPoin: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  touchableRowPoinSimas: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    height: 35,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  touchableRowPoinFirst: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    height: 35,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  touchableRowPoin1: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 45,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  poinImage: {
    height: 12,
    width: 35,
    paddingHorizontal: 10,
  },
  iconStyle: {
    color: theme.black,
    paddingHorizontal: 10
  },
  greyLine: {
    height: 10,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  textStyle: {
    fontSize: 11,
    paddingTop: 5,
    color: theme.black
  },
  textStyleQr: {
    fontSize: 11,
    color: theme.black,
    textAlign: 'center'
  },
  containerBanner: {
  },
  emoneyicon: {
    paddingBottom: 7,
    color: theme.brand,
  },
  emoneyicon2: {
    color: theme.black,
  },
  stylePoin: {
    color: theme.black,
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  stylePoinemoney: {
    color: theme.black,


  },
  containerPoinEmoney: {
    paddingLeft: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
    flexDirection: 'row',
    borderRadius: 20,
  },

  blackIcon: {
    color: theme.black,
  },

  redIcon: {
    color: theme.brand,
    paddingBottom: 2,
    marginTop: 5
  },
  imageStyle: {
  },
  redIconEmoney: {
    color: theme.brand,
    paddingBottom: 2,
    marginHorizontal: 10,
    marginTop: 5

  },
  blackIconEmoney: {
    color: theme.black,
    paddingBottom: 2,
    marginHorizontal: 10
  },
  poinImageReload: {
    height: 12,
    width: 35,
    paddingHorizontal: 10,
    marginLeft: 20
  },
  error: {
    paddingLeft: 10
  },
  error2: {
    paddingLeft: 20
  },
  floatLuckydip: {
    position: 'absolute',
    right: 10,
    top: height * 0.64,
    bottom: 0
  },
  imageLucky: {
    width: 120,
    height: 120,
    paddingLeft: 10
  },
  countdown: {
    top: 30,
    backgroundColor: 'transparent',
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 100
  },
  redRound: {
    backgroundColor: theme.darkOrange,
    height: 25,
    width: 25,
    borderRadius: 100,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterTextLuckyDip: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    paddingTop: 1,
    paddingHorizontal: 4
  },
  shadowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  clockBox: {
    backgroundColor: theme.red,
    borderRadius: 100
  }
};
