import {theme} from '../../styles/core.styles';
import {bold, fontSizeLargeStyle, fontSizeNormalStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
import {Platform} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white,
  },
  upperWrapper: {
    backgroundColor: theme.white,
  },
  mainTitle: {
    paddingVertical: 20,
    maxWidth: (65 * width - 30) / 100,
  },
  mainCheckLogo: {
    height: 40,
    width: 60,
    marginTop: 15,
  },
  mainTitleLogo: {
    width: 150,
    height: 30,
    marginTop: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonNext: {
    paddingVertical: 10,
    paddingHorizontal: width / 11,
    width: width,
    marginTop: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  rowSimas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    paddingBottom: 20,
    backgroundColor: theme.white,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  check: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20
  },
  middleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,

  },
  amountContainer: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerPushBill: {
    marginVertical: 10,
    marginBottom: 20
  },
  amountContainerPushBill: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  amountMiddleContainerPushBill: {
    // marginTop: 15,
    // marginBottom: 10,
    // paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmountPushBill: {
    // marginTop: 15,
    // paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
  },
  sourceAccountContainer: {
    marginVertical: 5,
  },
  helpContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pointsBarContainer: {
    height: 30,
    width: 200,
    flexDirection: 'row',
    paddingVertical: 10,
    alignSelf: 'center'
  },
  couponGainedTextContainer: {
    paddingTop: 20
  },
  additionalPadding: {
    paddingTop: 10
  },
  couponContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  greenProgress: {
    backgroundColor: theme.qrCouponIcon,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    height: 10
  },
  greyProgress: {
    backgroundColor: theme.greyLine,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    height: 10
  },
  tokenContainer: {
    paddingVertical: 10,
    borderColor: theme.greyLine,
    borderBottomWidth: 5,
  },

  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
    textAlign: 'center'
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black,
  },
  successText: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
  },
  noDepositText: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    color: theme.black
  },
  transrefnum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    paddingTop: 30,
    color: theme.black,
  },
  transrefnumLKD: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    paddingTop: 20,
    paddingBottom: 20,
    color: theme.black,
  },
  transrefnumSIL: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
  },
  transactionDate: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    marginTop: 30,
    marginRight: 20,
    color: theme.black,
  },
  receiptText: {
    color: theme.black,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
  },
  amountTitle: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    flex: 3,
    marginRight: 50,
    marginBottom: 10,
  },
  amountText: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  amountTextPush: {
    color: theme.black,
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
  transaction: {
    color: theme.textGrey,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  redText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  help: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  },
  detailKey: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight
  },
  detailValue: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  token: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  copy: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
  },
  XXlText: {
    fontSize: theme.fontSizeXXL,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    textAlign: 'center'
  },
  couponPointGet: {
    fontSize: theme.fontSizeMedium,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'roboto',
    color: theme.black,
  },
  couponPoints: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    flex: 1,
    textAlign: 'center',
    color: theme.black,
  },
  couponGet: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    color: theme.qrCouponIcon,
  },
  couponGetBlack: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
  },
  qrIcon: {
    color: theme.black,
  },
  qrIconText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    color: theme.qrCouponIcon,
    textAlign: 'center'
  },
  qrIconAmount: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    textAlign: 'left',
    color: theme.black,
  },

  logo: {
    paddingTop: 30,
  },
  logoSuccess: {
    paddingTop: 30,
    color: theme.green
  },
  logoFail: {
    paddingTop: 30,
    color: theme.grey
  },
  logoPending: { 
    paddingTop: 30,
    color: '#F5A623'
  },
  ph20: {
    paddingHorizontal: 20
  },
  responseView: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  white: theme.white,

  rowItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowItemRight: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  rowItemLeft: {
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },

  iconSend: {
    color: theme.lightBlue,
    paddingHorizontal: 10
  },
  iconMenu: {
    color: theme.grey,
    paddingHorizontal: 10,
    marginVertical: -10,
  },
  iconWallet: {
    color: theme.gold,
    paddingHorizontal: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },

  largeText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  summaryArea: {
    borderBottomWidth: 2,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  blackText: {
    color: theme.black
  },
  rightItemText: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal
  },
  mv5: {
    marginVertical: 5
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10
  },
  dateText: [bold, {
    fontFamily: 'Roboto',
  }],
  roboto: {
    fontFamily: 'roboto',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  simas: {
    flexDirection: 'row',
  },
  wallet: {
    color: theme.wallet, 
    marginBottom: 10
  },
  walletSell: {
    color: theme.wallet, 
    marginBottom: 20
  },
  mr10: {
    marginRight: 10
  },
  labelSpacing: {
    paddingVertical: 10
  },
  accNo: [bold, {color: theme.black}],
  product: {
    color: theme.black
  },
  more: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5,
    marginTop: -10
  },
  moreMen: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 20,
  },
  purchase: {
    color: theme.purchase,
  },
  purchaseSell: {
    color: theme.purchase,
    marginBottom: 10,
  },
  billHeader: [bold, {
    fontFamily: 'Roboto'
  }],
  amountBill: [bold, fontSizeLargeStyle],
  amountBillSmall: [bold, fontSizeNormalStyle],
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poinColapsible: {
    height: 15,
    width: 37,
    marginLeft: 5,
    marginTop: 5

  },
  amountFee: [fontSizeLargeStyle],
  
  detailTitle: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
    color: theme.black
  },
  summaryDetail: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  summaryDetailContainer: {
    marginBottom: 15
  },
  middleContainerTop: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  middleContainerBot: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  rowCou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,

  },
  couponTextUse: {
    color: theme.black,
    width: width - 140,
    fontFamily: 'roboto',
    paddingLeft: 20,
  },
  iconWidth: {
    width: 40,
    height: 40,
    bottom: Platform.OS === 'ios' ? 0 : 16,

  },
  paddingCoupon: {
    paddingVertical: 15,
  },
  backgroundColorCouponUse: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
  },
  middleContainerMiddle: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  greylineBold: {
    backgroundColor: theme.grey,
    height: 1,
  },
  containtextExplanation: {
    padding: 20,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: theme.softGrey,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  explainIcon: {
    color: theme.black,
    paddingTop: 20,
    paddingLeft: 10,
  }, 
  textExplanation: {
    color: theme.softGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    paddingLeft: 10,
    marginRight: 10,
    marginHorizontal: 10,
  },
  noResiContainerTop: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  splitBillText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  containerReceiptBill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successTextReksadana: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
    paddingRight: 5,
  },
  buttonContainer2: {
    // paddingVertical: 80,
    marginTop: 100,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
  },
  mainTitleText2: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black,
  },
  successText2: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
  },
  logoFail2: {
    paddingTop: 30,
    color: theme.grey
  },
  logoSuccess2: {
    paddingTop: 30,
    color: theme.green
  },
  logoPending2: { 
    paddingTop: 30,
    color: '#F5A623',
  },
  nulltext: {
    color: theme.white
  },
  paddingExchangeRateValas: {
    paddingVertical: 15,
  },
  containerConvertSavingValas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainerConvertValas: {
    justifyContent: 'flex-start',
  },
  titleConvertValas: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular,
    marginRight: 10,
    color: theme.black,
  },
  valueConvertValas: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
  },
  styleTotalConvertValas: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black,
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  mainTitleCheckBox: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  containtextExplanationAutoSave: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  checkboxLabel: [
    theme.fontSizeMediumStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightMedium,
      paddingRight: 20
    }
  ],
  tncTxt: [
    theme.fontSizeNormalStyle,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightRegular,
      color: theme.black
    }
  ],
  checkboxStyle: {
    width: 20,
    height: 20,
  },
  linearGradient: {
    borderRadius: 5,
    marginHorizontal: -10,
    paddingHorizontal: 20,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  luckyDipBox: {
    paddingVertical: 5,
    paddingRight: 40
  },
  iconBoxLuckyDip: {
    alignItems: 'center',
    width: 50,
    height: 50
  },
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  width: {
    width: 50,
  },
  paddingHHHBanner: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25
  },
  fontBannerHHH: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.white
  },
  iconLuckyDip: {
    width: 175,
    height: 25
  },
  textBannerContainer: {
    paddingLeft: 5
  },
  fontBannerHHHTwo: {
    fontWeight: theme.fontWeightBold
  },
  fontBannerHHHFour: {
    textDecorationLine: 'underline',
  },
  paddingaddBannerHHH: {
    paddingTop: 15,
    paddingHorizontal: 20
  },
  transrefnumShopeepay: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
  },
  footerIconAtten: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footerHours: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.softGrey,
    marginHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    paddingLeft: 10,
    padding: 5,
  },
  rowAtten: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerIconConfirmHours: {
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.black,
    paddingHorizontal: 10,
  },
  textFooterAttenConfirmHours: {
    fontSize: theme.fontSizeSmall,
    color: theme.lightBlack,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 25,
    fontWeight: theme.fontWeightLight
  },
  middleContainerEF: {
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  openLinkKustodian: {
    color: theme.blueAmount,
    fontFamily: 'Roboto',
  },
  bottomSpacing: {
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  closingDetailsTxt: {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: theme.fontSizeSmall,
  },
  closingNameTxt: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall
  },
  containerClosing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderTopSoft: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10,
    opacity: 0.2
  },
  mainTitleText1: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  receiptTextClosing: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto'
  },
};
