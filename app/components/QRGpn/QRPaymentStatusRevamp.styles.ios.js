import {theme} from '../../styles/core.styles';
import {bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {contentContainerStyle} from '../../styles/common.styles';
const heightIos = height > 750;
export default {
  scrollContainer: [contentContainerStyle],
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' && heightIos ? 35 : 0
  },
  contentContainerStyle: {
    padding: 5,
    backgroundColor: theme.white,
  },
  columnContainer: {
    backgroundColor: theme.white,
    padding: 5,
  },
  logoFail: {
    color: theme.grey
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10
  },
  borderTopCoupon: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginRight: 20,
    marginLeft: 20
  },
  paddingCoupon: {
    paddingVertical: 15,
  },
  backgroundColorCouponUse: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
  },
  rowCou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  iconWidth: {
    width: 40,
    height: 40
  },
  couponTextUse: {
    color: theme.black,
    width: width - 120,
    fontFamily: 'roboto',
    paddingLeft: 20,
  },
  mainTitle: {
    paddingVertical: 10,
    maxWidth: (65 * width - 30) / 100,
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
    justifyContent: 'space-between',
    // marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    marginBottom: 50,
  },

  helpContainer: {
    marginBottom: 30,
  },

  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black,
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

  logoSuccess: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginLeft: -125,
  },
  logoPendingNew: {
    position: 'absolute',
    width: 180,
    height: 180,
    marginLeft: -60,
    marginTop: 20
  },
  logoPending: {
    paddingTop: 30,
    color: '#F5A623'
  },
  ph20: {
    paddingHorizontal: 20,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  white: theme.white,
  roboto: {
    fontFamily: 'roboto',
    color: theme.black
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  accNo: [bold, {color: theme.black}],
  product: {
    color: theme.black,
    marginTop: 5

  },
  black: {
    color: theme.black,
  },
  amountBill: [bold, fontSizeLargeStyle],
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  middleContainerTop: {
    backgroundColor: theme.white,

  },
  middleContainerBot: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  mainTitleText2: {
    fontSize: 28,
    fontFamily: 'roboto',
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    marginBottom: -15
  },
  amountBill2: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeXL,
    marginBottom: 20
  }],

  columnHeader: {
    backgroundColor: theme.white,
    marginTop: 20,
  },

  share: {
    marginTop: 10,
    color: theme.black,
    fontSize: 19,
    paddingHorizontal: 10
  },
  amount: {
    marginTop: 60,
    paddingHorizontal: 15
  },
  close: {
    color: theme.black,
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: -10,
    fontSize: 19,
  },
  shares: {
    marginTop: 50,
    color: theme.black,
    fontSize: theme.fontSizeLarge,
  },
  payment: {
    marginBottom: 10
  },
  from: {
    paddingVertical: 10
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
  trans: {
    color: theme.black,
    flexDirection: 'column',
    textAlign: 'center',

  },
  receipt: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    textAlign: 'center',
  },

  middleContainerBoth: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.dashLine,
    borderStyle: 'dashed',
    marginBottom: 25,
    borderRadius: 1,
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
  },
  refnumContainer: {
    paddingTop: 20
  },
  transRefNum: {
    color: theme.black
  },
  poinImage: {
    height: 12,
    width: 35,
    alignItems: 'flex-end',
  },
  rowShort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitleTextQr: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
    textAlign: 'left',
  },
  totalContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  total: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto'
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 30,
    marginTop: 5
  },
  totalAmount: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto',
    fontWeight: 'bold'
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20
  },
  timeInitiate: {
  },
  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  sendAccNameType: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
  },
  walletIcon: {
    color: theme.wallet,
    paddingRight: 10,
  },
  profileIcon: {
    color: '#0787e3',
    paddingRight: 10,
    paddingTop: 10
  },
  receiptText: {
    color: theme.black,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
  },
  buttonContainerbot: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerPayment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  splitBillText: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  mainTitleCheckBox: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
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
  headerButtonContainer: {
    flexDirection: 'row',
    width: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  mainTitleLogoSuccess: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
    paddingRight: 50,
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
  paddingHHH: {
    padding: 20
  }
};
