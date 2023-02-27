import {theme} from '../../styles/core.styles';
import {bold, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  containerContent: [{justifyContent: 'space-between', backgroundColor: theme.superlightGrey}],

  top: {
    alignItems: 'center',
    height: hp('130%'),
  },
  topBiller: {
    alignItems: 'center',
    height: hp('140%'),
  },
  marginTop: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  tittleTrf: [
    styles.fontSizeLargeStyle,
    {
      fontWeight: theme.fontWeightBold,
      color: theme.white,
    }
  ],
  iconSuccess: {
    alignItems: 'center',
    paddingBottom: 10
  },
  logoSuccessIcon: {
    color: theme.green
  },
  bankTitle: {
    paddingTop: 5,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
  },
  containerLeft: {
    marginBottom: height * 0.015
  },
  transNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.couponGrey,
    borderRadius: 10,
    height: 50,
  },
  transrefnum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
    marginTop: 20
  },
  transrefnumSuccess: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: theme.white,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainerSuccess: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: theme.superlightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTransfer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    flex: 1,
    paddingTop: 80
  },
  textAcc: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20
  },
  additionalText: {
    color: theme.darkBlue,
    fontSize: 13
  },
  accNumberContainer: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  accNumber: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 80,
    alignItems: 'center'
  },
  extraPadding: {
    marginHorizontal: 20,
  },
  smallGreyText: [fontSizeSmallStyle, {
    color: theme.textGrey,
    fontFamily: 'Roboto',
  }],
  containerAmount: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: theme.couponGrey,
    paddingTop: 10,
  },
  containerToken: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.couponGrey,
    paddingTop: 10,
    marginHorizontal: 10
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
    marginHorizontal: 10
  },
  
  buttonContainerLain: {
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
    marginBottom: 10,
    marginTop: 20,
  },
  helpContainerSuccess: {
    marginBottom: 10,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailToken: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleToken: {
    color: theme.darkBlue,
    fontSize: 13,
    alignItems: 'center'
  },
  rowToken: {
    flexDirection: 'row',
  },
  robotoBoldToken: [bold, {
    fontFamily: 'Roboto',
    color: theme.black
  }],
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 1,
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
  
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: 50,
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
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    paddingTop: 10,
  },
  receiptTextSuccess: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginHorizontal: 10,
    paddingBottom: 10
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
    color: theme.textLightGrey,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  redText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  help: [fontSizeSmallStyle, {
    color: theme.textGrey,
    fontFamily: 'Roboto',
  }],
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
    marginLeft: -125,
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
    paddingHorizontal: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
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
    borderColor: theme.greyLine,
    marginVertical: 10,
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
  },
  dateText: [bold, {
    marginHorizontal: 10,
    fontFamily: 'Roboto',
  }],
  dateTextSuccess: [bold, {
    marginHorizontal: 20,
    fontFamily: 'Roboto',
    paddingTop: 30
  }],
  dateTextNew: [{
    fontFamily: 'Roboto',
    color: theme.darkBlue,
    marginHorizontal: 10,
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
    marginTop: 10,
    marginHorizontal: 10
  },
  rowAlignSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    marginRight: height * 0.1
  },
  rowAlignSuccessFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginRight: height * 0.1,
  },
  containerEmoney: {
    height: 35,
    width: 35,
    marginRight: 5,
    borderRadius: 10
  },
  dotContainer: {
    marginVertical: 5,
  },
  greyDot: {
    color: theme.darkBlue,
    marginLeft: 15,
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
    marginHorizontal: 10
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
    paddingHorizontal: 10,
    backgroundColor: theme.redText,
    borderColor: theme.greyLine,
    paddingVertical: 10
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
    marginHorizontal: 10
  },
  backgroundColorCouponUse: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
  },
  middleContainerMiddle: {
    paddingHorizontal: 5
  },
  noResiContainerTop: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  button2: {
    marginBottom: 20,
    marginTop: 20
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
    paddingLeft: 5,
    color: theme.black,
    fontSize: theme.fontSizeLarge,
  },
  amount: {
    marginTop: 60,
    paddingHorizontal: 15
  },
  close: {
    color: theme.black,
    flex: 1,
    paddingHorizontal: 5,
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
    borderColor: theme.greyLine,
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
  
  ph15: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  rowSimas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 10
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
  walletIcon: {
    color: theme.darkRed,
    marginRight: 10,
    marginTop: 5,
    padding: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.orangeWallet
  },
  sendIcon: {
    color: theme.darkBlue,
    marginRight: 10,
    marginTop: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.lightPink
  },
  accNoNewOne: {color: theme.darkBlue},
  accNoNew: [bold, {color: theme.darkBlue}],
  robotoNew: {
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue
  },
  sendAccNameType: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  sendAccType: {
    fontFamily: theme.robotoLight,
    color: theme.softGrey
  },
  transactionRevamp: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  buttonShareText: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium,
  },
  buttonContainerbotNew: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.superlightGrey
  },
  doneButton: {
    backgroundColor: theme.darkBlue
  },
  iconShare: {
    color: theme.darkBlue,
  },
  buttonShare: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5.5 : height / 5.5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * -0.1
  },
  spaceContainer: {
    paddingVertical: 10
  },
  imgIconFrom: {
    width: ((width - 40) * 0.2) / 2,
    height: ((width - 40) * 1) / 8.5,
    marginRight: 18,
    marginLeft: 5
  },
  imgIconSend: {
    width: ((width - 40) * 0.3) / 2,
    height: ((width - 40) * 1) / 8.5,
    marginRight: 10,
  },

  // NEW
  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 5.6,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  containerBannerWhite: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
  },
  paddingBox: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  paddingHHHBanner: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25
  },
  linearGradient: {
    borderRadius: 5,
    marginHorizontal: -10,
    paddingHorizontal: 20,
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
  textBannerContainer: {
    paddingLeft: 5
  },
  fontBannerHHH: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.white
  },
  fontBannerHHHTwo: {
    fontWeight: theme.fontWeightBold
  },
  fontBannerHHHFour: {
    textDecorationLine: 'underline',
  },
  mainTitleCheckBoxWhite: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white
  },
  mainTitleCheckBoxGrey: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.superlightGrey
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
  rowFieldAgreement: {
    flexDirection: 'row',
  },
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
  checkboxLabel: [
    theme.fontSizeMediumStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightMedium,
      paddingRight: 20
    }
  ],
  autoSaveReceipt: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingVertical: 20,
  },
  autoSaveBorder: {
    borderWidth: 1,
    borderColor: theme.grey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  containerUtama: {
    flex: 1
  },
  flexGrey: {
    backgroundColor: theme.superlightGrey
  },
};