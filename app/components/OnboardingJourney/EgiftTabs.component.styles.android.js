import {theme} from '../../styles/core.styles';
import {bold, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const {height, width} = Dimensions.get('window');
const model = DeviceInfo.getModel();
const foldSize = Number(width) >= 670;
const isFold = model === 'SM-F926B' && Number(width) >= 670;

export default {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRowService: {
    borderColor: theme.disabledGrey,
    height: 30,
    marginHorizontal: 5,
    marginTop: 5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerRow: {
    flexDirection: 'row',
    height: height / 10,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  containerRowOne: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 80,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  containerRowSimasPoin: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 60,
    marginHorizontal: 5,
    paddingTop: 5,
  },
  touchableRow: {
    alignItems: 'center',
    borderColor: 'transparent',
    flex: 0.5,
    borderWidth: 0.5,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  textstyle: {
    alignItems: 'flex-start',
    paddingHorizontal: 10
  },
  poinImage: {
    height: 23,
    width: 40,
    marginTop: 5
  },
  tabIcon: {
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  TabSimasPoin: {
    alignItems: 'center',
    paddingVertical: 20
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
  styleMessage: [
    bold,
    {
      fontSize: 16,
      color: theme.black}
  ],
  stylePoin: [
    bold,
    {
      fontSize: 14}
  ],
  containerContent: {
    flexGrow: 0,
    paddingBottom: 15,
    paddingTop: 20,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
    borderWidth: 0.5,
  },
  touchableRowNama: {
    alignItems: 'center',
    height: height / 4,
    borderColor: 'transparent',
    borderWidth: 0.5,
  },
  styleCaption: [
    fontSizeSmallStyle,
  ],
  emptyIcon: {
    width: 25,
    height: 25
  },
  iconStyle: {
    color: theme.black,
  },
  iconStyleFill: {
    position: 'absolute',
    color: theme.brand
  },
  iconStyleRed: {
    color: theme.brand
  },
  iconContainer: {
    paddingLeft: 5
  },
  burger: {
    color: theme.black,
  },
  navchart: {
    width: 420,
    height: 75,
    borderRadius: 20,
    zIndex: 1,
    marginVertical: -70,
    backgroundColor: theme.red
  },
  slideOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems
  },
  buttonPromoContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10
  },
  buttonFindDeals: {
    backgroundColor: theme.white,
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 7,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.greyLine,
  },
  iconDiscount: {
    color: theme.black
  },
  findNearby: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
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
  iconScan: {
    paddingRight: 5,
    color: theme.white
  },
  scanPromo: {
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    paddingRight: 20
  },
  couponFill: {
    position: 'absolute',
    color: '#FFD8D8',
  },
  serviceItemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  styleMessageSeeAllBiller: {
    textstyle: theme.red,
    padding: 0,
    color: 'red'
  },
  textBillPayStyleBL: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    marginBottom: 25,
    marginTop: 10,
    fontSize: theme.fontSizeMedium
  },
  iconCart: {
    marginLeft: 0,
    flexDirection: 'row',
    color: theme.black,
  },
  greyLine: {
    height: 10,
    backgroundColor: theme.superlightGrey,
    // marginVertical: 10
  },
  greyLine2: {
    height: 3,
    backgroundColor: theme.superlightGrey,
    marginTop: 20,
  },
  seeallredeem: {
    textstyle: theme.red,
    padding: 0,
    color: 'red'
  },
  containerBillpay: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.white,
    height: 80,
    paddingVertical: 20
  },
  containerRowNew: {
    flexDirection: 'row',
    height: 68,
    marginHorizontal: -17,
    paddingTop: 5,
    backgroundColor: 'transparent',
  },
  containerScrollView: {
    backgroundColor: theme.superlightGrey,
  },
  containerRowBillpayOne: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 90,
    marginTop: 20,
    marginVertical: -4,
    backgroundColor: 'transparent',
  },
  containerRowBillpay: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 90,
    marginTop: 10,
    backgroundColor: 'transparent',
    marginBottom: 10
  },
  textBillPayStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textBillPayStyle2: {
    paddingHorizontal: 10,
  },
  containerRowRedeem: {
    borderColor: theme.disabledGrey,
    marginHorizontal: 5,
    paddingTop: 15,
    marginBottom: -10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerRowServiceBillpay: {
    borderColor: theme.disabledGrey,
    marginHorizontal: 5,
    marginBottom: -44,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBillPayStyleBL1: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    paddingBottom: 20,
    fontSize: theme.fontSizeMedium
  },
  styleMessageSeeAllBiller1: {
    textstyle: theme.red,
    color: 'red',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  containerAlfa: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  containerAlfaSmall: {
    flexDirection: 'row',
    paddingVertical: 1.5,
    justifyContent: 'space-between'
  },
  alfaIcon: {
    width: 70,
    height: 50
  },
  containerInnerAlfaCart1: {
    backgroundColor: theme.white,
    marginLeft: width * 0.05,
    borderRadius: 10,
    width: width * 0.83,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  containerInnerAlfaCart2: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    width: width * 0.83,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  shortContainerInnerOffer: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.01,
    borderRadius: 10,
    width: width * 0.40,
    height: width * 0.40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.greyLine,
  },
  containerInnerOffer: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.greyLine,
  },
  containerInnerOfferLifestyle: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.01,
    borderRadius: 10,
    width: width * 0.40,
    height: width * 0.40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.greyLine,
  },
  bannerKoperasi: {
    width: width * 0.83,
    height: height * 0.2
  },
  bannerLifestyle: {
    width: width * 0.79,
    height: height * 0.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bannerLifestyleElse: {
    width: width * 0.40,
    height: height * 0.125,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bannerinnerOffer: {
    width: width * 0.89,
    height: height * 0.2
  },
  emptyBannerKoperasi: {
    width: width * 0.9,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  textAlfaContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  arrowIcon: {
    justifyContent: 'center',
    right: 10
  },
  titleCode: {
    color: theme.black,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS
  },
  textEstoreTitle: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    paddingBottom: 15,
  },
  redBackground: {
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'baseline',
    marginLeft: 5,
    height: 14,
    marginTop: 3,
    backgroundColor: theme.brand,
  },
  newText: {
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    fontFamily: theme.roboto,
  },
  titleCodeBold: {
    color: theme.black,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall
  },
  containerBillpay2: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginHorizontal: width * 0.049,
    marginVertical: foldSize || isFold ? width * 0.13 : width * 0.19,
    borderRadius: 10,
    width: width * 0.9,

  },
  containerBillpay2login: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginHorizontal: width * 0.049,
    marginVertical: foldSize || isFold ? width * 0.13 : width * 0.19,
    borderRadius: 10,
    width: width * 0.9,

  },
  containerBillpay3: {
    backgroundColor: theme.white,
    marginTop: 10,
    paddingHorizontal: 20
  },
  backgroundColor: {
    backgroundColor: theme.white,
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5 : height / 5,
    width: width,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'transparent',
    marginBottom: foldSize || isFold ? 70 : 50
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'row',
    paddingVertical: 10
  },
  touchableRowPoinFirst: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: 30,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  redIcon: {
    color: theme.brand,
    paddingBottom: 2
  },
  blackIcon: {
    color: theme.black,
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: Platform.OS === 'ios' ? 2 :  20,
  },
  borderBillpay: {
    flex: 3,
    width: Platform.OS === 'android' ? 0.9 * 0.25 * width : 0.9 * 0.3 * width,
    paddingTop: 3
  },
  borderBillpaySimasPoin: {
    flex: 3,
    width: Platform.OS === 'android' ? 0.9 * 0.25 * width : 0.9 * 0.3 * width,
  },
  textStyle: {
    fontSize: 12,
    paddingTop: 5,
    color: theme.black
  },
  containerPoinEmoney: {
    paddingLeft: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  touchableRowPoinSimas: {
    paddingLeft: 10,
    height: 30,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  iconInbox: {
    // marginVertical: 50,
    flexDirection: 'row',
    // paddingHorizontal: 20,
    // paddingRight: 20
  },
  iconboxRight: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconboxLeft: {
    flex: 2,
    justifyContent: 'center',
  },
  iconNotif: {
    color: theme.white,
    marginRight: 5,
  },

  cartRed: {
    borderRadius: 15,
    height: 10,
    width: 10,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 1
  },
  nameInfo: [
    bold,
    {
      color: theme.white,
    }],
  offerDetails: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.greyLine,
    alignItems: 'center',
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall
  },
  labelSmall: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeXS,
    color: theme.black
  },
  labelValidDate: {
    marginHorizontal: 10,
  },
  containerInnerEgift: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    marginRight: -8,
    borderRadius: 10,
    width: 120,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  bannerEgift: {
    height: 120,
    width: 120
  },
  labelpoin: {
    fontSize: theme.fontSizeXS,
    paddingHorizontal: 5
  },
  iconRed: {
    color: theme.red
  },
  pictureIcon: {
    height: 25,
    width: 25
  },
  border: {
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.white,
    marginHorizontal: -2
  },
  border2: {
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.white,
    marginLeft: -2
  },
  poinamount: {
    height: 10,
    width: 10
  },
  textStyleBank: {
    color: theme.black
  },
  logoutContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 5
  },
  iconNotif2: {
    color: theme.white,
    // marginBottom: 17,
    position: 'absolute',
    marginTop: 5,
    marginLeft: 22
  },
  iconNotif3: {
    color: theme.white,
    marginBottom: 5
  },
  iconNotif1: {
    color: theme.white,
  },
  iconboxRight2: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -5,
    flexDirection: 'row',
    marginRight: -50
  },
  categoryTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  categoryActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.pinkBrand,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  categoryInActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.white,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.grey
  },
  activeText: {
    color: theme.white
  },
  inActiveText: {

  },
  activeDot: {
    height: 7,
    width: 7,
    backgroundColor: theme.pinkBrand,
    margin: 5,
    borderRadius: 5
  },

  containerQrExplain: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: width * 0.049,
    paddingVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    alignSelf: 'center',
    height: 30,
    width: 150,
    resizeMode: 'contain',
  },
  qrExplain: {
    alignSelf: 'center',
  },

  backgroundColorNoLogin: {
    backgroundColor: theme.lightGrey,
    height: Platform.OS === 'ios' ? height / 5 : height / 5,
    width: width,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'transparent',
    marginBottom: foldSize || isFold ? 70 : 50
  },
  rowContainerHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: width * 0.049,
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  iconSearch: {
    color: theme.white,
    marginTop: 5,
    marginRight: 5
  },
  iconLogin: {
    color: theme.white,
    marginTop: 5,
    marginLeft: 5
  },
  textContainerLogin: {
    textAlign: 'right',
  },
  textNoLogin: {
    color: theme.white,
    textAlign: 'right',
    fontSize: theme.fontSizeSmall,
  },
  iconTitleLogoLogin: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  iconTitleLogo: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  serviceContainer: {
    flex: 2,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  rowHeader1Login: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  },
  rowHeader1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  },
  textContainerLogin1: {
    textAlign: 'left',
  },
  buttonLanding: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.grey,
  },
  textLogin: {
    color: theme.lightGrey,
    fontSize: theme.fontSizeSmall,
  },
  textLogout: {
    color: theme.pinkBrand,
    fontSize: theme.fontSizeSmall,
  },
  bannerProduct: {
    width: 340,
    height: 75
  },
  containerInnerProduct: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  containerInnerProductSeall: {
    backgroundColor: theme.white,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  OffersContainer: {
    // marginHorizontal: 25,

    // alignSelf: 'center',
    paddingVertical: 10,
  },
  containerProd: {
    padding: 5,
    backgroundColor: theme.white
  },
  scrollContainer: {
    paddingBottom: 80,
    marginHorizontal: 25
  },
  bgColorGold: {
    backgroundColor: theme.goldMember
  },
  bgColorSilver: {
    backgroundColor: theme.silver
  },
  bgColorDiamond: {
    backgroundColor: theme.diamond
  },
  bgColorPlatinum: {
    backgroundColor: theme.platinum
  },
  buttonLanding2: {
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textStatus: [bold, {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
  }],
  memberimage: {
    height: 19,
    width: 98
  },
  memberimage2: {
    height: 19,
    width: 116
  }
};
