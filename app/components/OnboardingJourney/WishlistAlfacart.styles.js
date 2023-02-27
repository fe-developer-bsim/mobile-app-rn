import {theme} from '../../styles/core.styles';
import {bold, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRowService: {
    borderColor: theme.disabledGrey,
    height: 10,
    marginHorizontal: 5,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerRow: {
    flexDirection: 'row',
    height: 10,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  containerRowOne: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 70,
    marginHorizontal: 10,
    marginTop: 5,
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
    height: height / 6,
    borderColor: 'transparent',
    flex: 0.5,
    borderWidth: 0.5,
    paddingVertical: 5,
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
  },
  TabSimasPoin: {
    alignItems: 'center',
    paddingVertical: 20
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 40,
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
  itemCart: {
    fontSize: 10,
    color: theme.black,
    paddingTop: 10,
    justifyContent: 'flex-start'
  },
  itemHeader: {
    fontSize: 10,
    color: theme.black,
    paddingTop: 10,
    alignItems: 'center',
  },
  textCart: [
    bold,
    {
      fontSize: 10,
      color: theme.black}
  ],
  buttonContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLeftInner: {
    flex: 1,
    marginRight: 10,
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.brand,
    height: 50,
  },
  buttonRightInner: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: theme.brand,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.brand,
    height: 50,
  },
  textAdd: {
    color: theme.white,
    fontSize: theme.fontSizeSmall
  },
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft: 100,
    marginTop: 10
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
    color: 'red'
  },
  textBillPayStyle: {

    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  textBillPayStyleBL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    marginBottom: 10,
    marginTop: 10,
    fontSize: theme.fontSizeMedium
  },
  textBillPayStyleBL2: {
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
    backgroundColor: theme.greyLine,
    marginVertical: 10
  },
  greyLine2: {
    height: 2,
    backgroundColor: theme.greyLine,
    marginVertical: 5
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
    height: 78,
    marginHorizontal: -17,
    paddingTop: 5,
    backgroundColor: 'transparent',
  },
  containerScrollView: {
    backgroundColor: theme.white
  },
  containerProduct: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRowServiceBillpay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.darkGrey,
    marginHorizontal: 5,
    paddingTop: 5,
    marginBottom: -10,
    backgroundColor: theme.white
  },
  containerRowServiceBillpay2: {
    borderColor: theme.darkGrey,
    marginHorizontal: 5,
    backgroundColor: theme.white
  },
  containerRowRedeem: {
    borderColor: theme.disabledGrey,
    marginHorizontal: 5,
    paddingTop: 5,
    marginBottom: -10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerRowBillpay: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 70,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  containerRowBillpayOne: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 70,
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: -4,
    backgroundColor: 'transparent',
  },
  containerRowOneNew: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 50,
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: 'transparent',
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
  iconCategory: {
    width: 100,
    alignSelf: 'center',
    color: theme.white,
    marginBottom: 20,
    marginTop: 20
  },
  nameCategory: {
    alignSelf: 'center',
    color: theme.white,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 15
  },
  allProduct: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    borderColor: theme.greyLine
  },
  center: {
    alignItems: 'center'
  },
  buttonLogin: {
    paddingBottom: 20,
    paddingTop: 5
  },
  imageProduct: {
    paddingTop: 20
  },
  textButton: {
    color: theme.white
  },
  textAlfa: {
    color: theme.white,
    fontSize: 10
  },
  textBuy: {
    color: theme.brand,
    fontSize: theme.fontSizeSmall
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: -100,
  },
  brandContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  brandPadding: {
    paddingBottom: 10
  },
  itemsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  item: {
    borderWidth: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    width: 0.4 * width,
    borderRadius: 10,
  },
  gradientColor: {
    borderWidth: 3,
    marginRight: 5,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderColor: theme.white,
    borderRadius: 10,
    width: 0.4 * width
  },
  imageSize: {
    aspectRatio: 1
  },
  imageContainer: {
    padding: 10,
    marginTop: 20
  },
  itemNameContainer: {
    paddingBottom: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1

  },
  itemName: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    color: 'black',
    alignSelf: 'center'
  },
  priceContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  grossPrice: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    textDecorationLine: 'line-through'
  },
  poinContainer: {
    justifyContent: 'center',
    paddingBottom: 2
  },
  price: {
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
    justifyContent: 'center'
  },
  poin: {

    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  brand: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  error: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  Seperator: {
    height: 1,
    width: '80',
    backgroundColor: '#CED0CE',
    marginLeft: '14'
  },
  nulleVoucher: [{
    alignItems: 'center',
  },
  fontSizeNormal,
  textLightGreyStyle,
  ],
  nullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100
  },
  renderFooter:
  {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  panel: {
    height: height / 1.8,
    padding: 20,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.grey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  subPanelHandle: {
    width: 30,
    height: 2,
    backgroundColor: theme.grey,
    marginBottom: 2,
  },
  panelHandle: {
    width: 35,
    height: 2,
    backgroundColor: theme.grey,
    marginBottom: 10,
  },
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderedContainer: {
    width: 300,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  plusminBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 125
  },
  largeText: {
    fontSize: theme.fontSizeXL
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textLightGrey
  },
  closePopUp: {
    alignItems: 'center',
    marginLeft: 200
  },
  centerQty: {
    height: 40,
    width: 40,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notesInput: {
    width: width - 80
  },
  rowOngkir: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  ph20: {
    paddingHorizontal: 20,
  },
  rowEndOngkir: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10
  },
  borderedContainerOngkir: {
    borderWidth: 1,
    borderRadius: 30,
    width: 320,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: theme.red,
    borderColor: theme.red,
  },
  iconOngkir: {
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
    color: theme.white
  },
  textOngkir: {
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
};
