import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  container: [contentContainerStyle],

  containerContent: [{justifyContent: 'space-between'}],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerIcon: {
    color: theme.amount,
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
  greyDot: {
    color: theme.greyDot,
    marginLeft: 3,
    marginBottom: 5
  },
  greyDotSplitBill: {
    color: theme.black,
    marginLeft: 3,
    marginTop: 5
  },
  greyDotSplitBill2: {
    color: theme.black,
    marginLeft: 3,
    bottom: 8
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  labelSpacing: {
    paddingVertical: 10
  },

  titleContainer: {
    marginBottom: 15
  },

  textInputContainerPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 10,
    height: 55,
  },

  amountField: {
    textAlign: 'center',
    flex: 1,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginLeft: 30
  },
  leftIcon: {
  },

  rightIcon: {
    right: 10,
  },

  timeInitiate: {
    paddingTop: 15
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },

  greyLineBold: {
    backgroundColor: theme.grey,
    height: 1,
  },
  greyLineThin: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: 330
  },
  summaryContainer: {
    flex: 1,
    paddingVertical: 15
  },

  headerSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  detailTitle: [bold, {
    marginBottom: 2,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  rowItemRight: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  rightItemContainer: {
  },
  rightItemContainerSend: {
    paddingHorizontal: 15
  },
  summaryDetail: {
    fontFamily: theme.robotoLight,
    color: theme.black
  },
  rightItemText: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  amountLeft: {
    fontWeight: theme.fontWeightMedium
  },
  amountRight: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium
  },
  halfWidth: {
    flex: 1
  },
  detailAmtHide: {
    height: 0,
    width: 0,
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  amount: {
    color: '#4ed07d',
  },
  amountText: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
  }],
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  information: {
    color: theme.brand,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
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
    marginTop: 10
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    marginLeft: 10
  },
  explainIcon: {
    color: theme.black
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  smallGreyText: [fontSizeSmallStyle, {
    color: theme.softGrey,
    fontFamily: 'Roboto'
  }],
  extraPadding: {
    paddingTop: 3
  },
  notes: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailContainer: {
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black,
  },

  // SPlitBill Revamp
  containerHead: {
    flex: 1,
  },
  containerContentRevamp: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  containerRevamp: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  backgroundColor2: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.4,
    position: 'absolute',
  },
  containerBanner2: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
  },
  contentInnerBox: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  amountTextSplitBill: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
    paddingHorizontal: 60
  }],
  rowBetweenSplitBill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10
  },
  boxNote: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  noteTextSplitBill: {
    fontFamily: theme.robotoLight,
    color: theme.textGrey,
    paddingHorizontal: 10
  },
  additionalText: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    paddingTop: 10
  },
  additionalRow: {
    paddingVertical: 10,
  },
  amountRow: {
    paddingVertical: 10
  },
  amountSubText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  timeInitiateSplitBill: {
    paddingVertical: 20
  },
  timeInitiateSplitBillText: {
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  sendAccNumberSplitBill: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular,
    color: theme.darkBlue
  },
  sendAccNameTypeSplitBill: {
    color: theme.black,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
  },
  sendAccNameTypeProductSplitBill: {
    color: theme.textGrey,
    fontFamily: theme.robotoLight,
  },
  detailSubTitle: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  detailSubText: [bold, {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium
  }],
  transferDetailRow: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  rowBetweenDetailsSplitBill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountDetailsSplitBill: [{
    fontFamily: 'Roboto',
    color: theme.darkBlue,
  }],
  amountDetailSub: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto'
  },
  rowBetweenDetailsFeeSplitBill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  amountTotalSplitBill: [bold, {
    fontFamily: 'Roboto',
    color: theme.black,
  }],
  amountTotal: [bold, {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  }],
  containtextExplanationSplitBill: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: theme.white,
    marginVertical: 30,
    marginHorizontal: 20
  },
  explainIconSplitBill: {
    color: theme.darkBlue
  },
  textExplanationSplitBill: {
    fontSize: theme.fontSizeSmall,
    color: theme.darkBlue
  },
  buttonBottomSplitBill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  walletIconNew: {
    color: theme.darkRed,
    paddingRight: 10,
    marginRight: 10,
    padding: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.orangeWalletBg
  },
  profileIconNew: {
    color: theme.darkBlue,
    marginRight: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.orangeWalletBg
  },
  boxNew: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  greyLineBoldNew: {
    backgroundColor: theme.grey,
    height: 1,
    marginVertical: 10,
    marginHorizontal: -20
  },
  rowBetweenDetailTotalSplitBill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingBottom: 20
  },
  newRpIcon: {
    position: 'absolute', 
    left: 15, 
    top: 10,
    width: 30,
    height: 30
  },
  iconSplitBill: {
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'center',
    width: 35,
    height: 35
  }
};
