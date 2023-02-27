import {theme, containerGreyStyle} from '../../styles/core.styles';
import {bold, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
const {height, width} = Dimensions.get('window');
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);
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
    height: 14,
    width: 35
  },
  tabIcon: {
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  TabSimasPoin: {
    alignItems: 'center',
    paddingVertical: 20
  },
  styleMessage: [
    bold,
    {
      fontSize: 16,
      color: theme.darkBlue}
  ],
  stylePoin: [
    bold,
    {
      fontSize: 14}
  ],
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
    marginBottom: 36,
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
    marginVertical: 10
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
    height: height,
  },
  containerRowBillpayOne: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 70,
    marginTop: 20,
    marginVertical: -4,
    backgroundColor: 'transparent',
  },
  containerRowBillpay: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 70,
    marginTop: 10,
    backgroundColor: 'transparent',
    marginBottom: 20
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
    paddingTop: 20,
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
    justifyContent: 'space-between'
  },
  alfaIcon: {
    width: 70,
    height: 50
  },
  containerInnerAlfaCart: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20
  },
  bannerKoperasi: {
    width: width * 0.9,
    height: height * 0.2
  },
  textAlfaContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  arrowIcon: {
    justifyContent: 'center',
    paddingRight: 20
  },
  titleCode: {
    color: theme.black,
    fontFamily: theme.roboto,
  },
  textEstoreTitle: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    paddingBottom: 30,
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
  },
  containerBillpay2: {
    backgroundColor: theme.white,
    position: 'absolute',
    marginHorizontal: width * 0.049,
    marginVertical: normalIosphone === true ? width * 0.10 : normalIosphone === false ? height * 0.05 : width * 0.10,
    borderRadius: 10,
    width: width * 0.9,

  },
  containerBillpay3: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginHorizontal: width * 0.049,
  },
  backgroundColor: {
    backgroundColor: theme.white,
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 7 : height / 6,
    marginBottom: 80
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  containerLeft2: {
    marginTop: 5,
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    flex: 1
  },
  touchableRowPoinFirst: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: 30,
    width: Platform.OS === 'android' ? 0.9 * 0.5 * width : 0.9 * 0.5 * width
  },
  redIcon: {
    color: theme.red,
    paddingBottom: 5
  },
  blackIcon: {
    color: theme.black,
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: Platform.OS === 'ios' ? 2 :  10,
  },
  premiumIcon: {
    color: theme.red,
    marginTop: -2
  },
  borderBillpay: {
    marginHorizontal: 20,
  },
  textStyle: {
    fontSize: 9,
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
    marginVertical: 50,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  iconboxRight: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconboxLeft: {
    flex: 2
  },
  iconNotif: {
    color: theme.white
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
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.greyLine
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall
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
    shadowColor: '#000',
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
  container: [containerGreyStyle, {backgroundColor: theme.superlightGrey,
  }],
  roboto: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  textBalance: {
    fontFamily: 'Roboto',
    color: theme.lightPurple,
    fontSize: theme.fontSizeXS,
  },
  textAmount: [bold, {
    fontFamily: 'Roboto',
    color: theme.black,
    fontSize: theme.fontSize20,
  }],
  textAccNum: {
    fontFamily: 'Roboto',
    color: theme.lightPurple,
    fontSize: theme.fontSizeSmall,
  },
  topUpBotton: {
    backgroundColor: theme.brand,
    borderRadius: 20,
    height: 35,
    width: 90,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  topUpText: {
    fontFamily: 'Roboto',
    color: theme.white,
    paddingVertical: 8
  },
  textUpgrade: {
    color: theme.red,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  menuTitle2: {
    fontSize: theme.fontSizeXS
  },
  buttonOn: {
    marginLeft: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.brand,
    borderRadius: 20
  },
  buttonOff: {
    marginLeft: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.greyLine,
    borderRadius: 20
  },
  defaultTextWhite: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'center',
  },
  defaultTextGrey: {
    color: theme.grey,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    textAlign: 'center',
  },
};
