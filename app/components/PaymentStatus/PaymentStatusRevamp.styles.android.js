import {theme} from '../../styles/core.styles';
import {bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white,
    padding: 5,
  },
  mainTitle: {
    paddingVertical: 10,
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
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    marginBottom: 50
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
  helpContainer: {
    marginBottom: 20,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
    marginTop: 30
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
    paddingTop: 20
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
  black: {
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
  logoSuccess: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginLeft: -80,
    marginTop: 10
  },
  logoFail: {
    paddingTop: 30,
    color: theme.grey,
  },
  logoPending: { 
    paddingTop: 30,
    color: '#F5A623'
  },
  ph20: {
    paddingHorizontal: 20,
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
  largeText: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeLarge,
  }],
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
    color: theme.black,
  },
  rightItemText: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal
  },
  mv5: {
    marginVertical: 5,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10,
  },
  dateText: [bold, {
    fontFamily: 'Roboto',
  }],
  roboto: {
    fontFamily: 'roboto',
    color: theme.black
  },
  robotoBold: {
    fontFamily: 'roboto',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  wallet: {
    color: theme.wallet
  },
  mr10: {
    marginRight: 10
  },
  labelSpacing: {
    paddingVertical: 10
  },
  accNo: [bold, {color: theme.black}],
  product: {
    color: theme.black,
    marginTop: 5
  },
  products: {
    color: theme.black,
  },
  more: {
    color: theme.grey,
    marginLeft: 3,
    marginVertical: 10,
  },
  purchase: {
    color: theme.purchase,
  },
  billHeader: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  amountBill: [bold, fontSizeLargeStyle],
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    marginBottom: 10,
  },
  middleContainerTop: {
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  middleContainerMid: {
    paddingHorizontal: 15,
    marginBottom: -50
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
    height: 40
  },
  paddingCoupon: {
    paddingVertical: 15,
  },
  backgroundColorCouponUse: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
  },
  middleContainerMiddle: {
    paddingHorizontal: 15
  },
  noResiContainerTop: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  button2: {
    marginTop: 20,
  },
  mainTitleText2: {
    fontSize: 28,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    marginBottom: -15
  },
  amountBill2: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeXL,
    marginBottom: 20
  }],
  lineDashed: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.dashLine,
  },
  summaryArea2: {
    paddingBottom: 10,
    marginBottom: 10
  },  
  columnHeader: {
    marginTop: 20,
    marginLeft: -5,
    marginBottom: -10
  },
  share: {
    marginTop: 30,
    paddingHorizontal: 5,
    color: theme.black,
    fontSize: 19,
  },
  amount: {
    marginTop: 60,
    paddingHorizontal: 15
  },
  close: {
    color: theme.black,
    paddingHorizontal: 5,
    marginTop: 30,
    fontSize: 19,
  },
  payment: {
    marginBottom: 10
  },
  from: {
    paddingVertical: 10,
  },
  sento: {
    paddingVertical: 10
  },
  type: {
    marginTop: 10,
    marginBottom: 5
  },
  time: {
    color: theme.black,
    textAlign: 'center',
  },
  receipt: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    textAlign: 'center',
    marginTop: 5,
    paddingBottom: 5
  },
  line: {
    marginTop: 10,
    marginBottom: 25
  },
  middleContainerBoth: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderColor: theme.greyLine,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.dashLine,
    borderStyle: 'dashed',
    marginBottom: 25,
    borderRadius: 1,
  },
  summaryDetails: {
    fontFamily: 'Roboto',
    color: theme.black,
  },
  detailTitles: {
    fontFamily: 'Roboto',
    color: theme.black,
  },
  transdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 15
  },
  transdetailId: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 2,
    paddingHorizontal: 15
  },
  borderBottom: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 3
  },
  buttonContainerbot: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20
  },
  borderMid: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  copyIcon: {
    marginRight: 2,
    marginLeft: 5,
    marginTop: 3,
    color: theme.black,
  },
  poinImage: {
    height: 12,
    width: 35
  },
  logoSuccessIcon: {
    paddingTop: 30,
    color: theme.green
  },
  ph15: {
    paddingHorizontal: 15
  },
  pb30: {
    paddingBottom: 30
  },
  splitBillText: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  },
  containerPayment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSimas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  simas: {
    flexDirection: 'row',
  },
  poinColapsible: {
    height: 15,
    width: 37,
    marginLeft: 5,
    marginTop: 5
  },
  rowSimasPoin: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: 10
  },
  poinPayment: {
    marginTop: 8,
    height: 18,
    width: 50,
  },
  poinColapsibleRev: {
    height: 15,
    width: 37,
    marginLeft: 5,
  },
  detailContainerInfo: {
    marginVertical: 10,
    paddingHorizontal: 15,
    marginBottom: -15,
  },
  detailTelkom: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleTextSil: {
    fontSize: 28,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    marginBottom: -15
  },
  successTextSil: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
    marginTop: 30,
    marginBottom: -30
  },
  headerButtonContainer: {
    flexDirection: 'row',
    width: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTitleLogoSuccess: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
    paddingRight: 50,
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  mainTitleCheckBox: {
    paddingHorizontal: 20,
    backgroundColor: theme.white
  },
  containtextExplanation: {
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
  transrefnumShopeepay: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    paddingTop: 30,
    color: theme.black,
  },
};
