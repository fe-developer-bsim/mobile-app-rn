import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: [contentContainerStyle, {marginTop: height * 0.5}],

  containerContent: [{flexGrow: 1, backgroundColor: theme.superlightGrey, justifyContent: 'space-between'}],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
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
    color: theme.darkBlue,
    marginLeft: 3,
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
  sendAccName: {
    color: theme.darkBlue,
    fontFamily: theme.robotoLight,
    fontSize: 15,
    fontWeight: theme.fontWeightBold,

  },
  sendAccType: {
    color: theme.darkBlue,
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
    paddingTop: 0
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },

  greyLineBold: {
    backgroundColor: theme.black,
    height: 2,
  },
  greyLineBold2: {
    backgroundColor: theme.black,
    height: 1,
    marginVertical: 10
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
    width: width * 0.65
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
    fontSize: theme.fontSizeMedium,
    marginLeft: 15,
    justifyContent: 'center'
  },
  notetRight: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium,
    justifyContent: 'center'
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
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue
  },
  textDetailLeft: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: theme.white
  },
  transferDetail: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: theme.white
  },
  transferDetailRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    marginLeft: 10
  },
  explainIcon: {
    color: theme.darkBlue
  },
  btnConfirm: {
    width: width / 2.4,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: theme.darkBlue
  },
  btnShare: {
    width: width / 2.4,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: theme.white

  },
  bottomSpacing: {
    marginTop: hp('0%'),
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    width: width,
    flexDirection: 'row'
  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontWeight: 'bold'
  },
  buttonLargeTextStyleShare: {
    color: theme.darkBlue,
    fontWeight: 'bold'
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  smallGreyText: [fontSizeSmallStyle, {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontSize: 13,
  }],
  smallGreyNote: [fontSizeSmallStyle, {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10
  }],
  mInfoText: [fontSizeSmallStyle, {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontSize: 12,
    marginTop: 13
  }],
  mInfoTextBottom: [fontSizeSmallStyle, {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontSize: 12,
    marginTop: 13,
    alignSelf: 'flex-start'
  }],
  smallGreyCall: [fontSizeSmallStyle, {
    color: theme.red,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10
  }],
  callText: {
    flexDirection: 'row',
    marginBottom: 10
  },
  mInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  extraPadding: {
    paddingTop: 15,
    padding: 10
  },
  notes: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black,
  },
  center: {
    alignItems: 'center',
    height: hp('100%'),
  },
  centerCashOut: {
    alignItems: 'center',
    height: hp('20%'),
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5 : height / 7.5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.65

  },
  imageSummary: {
    flex: 1,
    width: width,
    height: height * 1.2,
    position: 'absolute',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  tes: {
    alignItems: 'center'
  },
  gradientGrey: [
    theme.pinkBrand,
    theme.superlightGrey
  ],
  containerTransfer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    borderRadius: 15,
    width: width * 0.9,
    top: height / 30,
    flex: 1

  },
  iconTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  transactionDate: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    marginTop: 10,
    color: theme.black,
  },
  transactionStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  transactionStatusText: {
    color: theme.white,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white
  },
  accNumberContainer: {
    backgroundColor: '#f9f8fd',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: width * 0.85,
    right: 10,
    borderRadius: 10
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  amountContainer3: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetAcc: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  targetName: {
    color: theme.black,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10
  },
  textAmountNormal: {
    color: theme.black,
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 5
  },
  textAmountBold: {
    color: theme.black,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 5
  },
  receipt: {
    color: theme.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  transactionNumberContainer: {
    backgroundColor: '#f9f8fd',
    marginVertical: 25,
    borderRadius: 15,
    width: width * 0.85,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blueLine: {
    backgroundColor: theme.superlightGrey,
    height: 2,
    width: width,
    right: 50
  },
  transactionNumber: {
    color: theme.black,
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center'
  },
  accNumber: {
    backgroundColor: '#f9f8fd',
    color: theme.red,
    marginVertical: 25,
    borderRadius: 15,
    width: width * 0.85,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIcon: {
    color: '#27AE60',
  },
  logoPending: { 
    color: '#F5A623'
  },
  textAcc: {
    marginBottom: 10,
    alignItems: 'center'
  },
  additionalText: {
    color: theme.darkBlue,
    fontSize: 17
  },
  sofCard: {
    backgroundColor: theme.lightPink,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 20
  },
  iconRed: {
    color: theme.red
  },
  iconBlue: {
    color: theme.darkBlue,
    fontWeight: 'bold'
  },
  dotContainer: {
    marginVertical: 5,
    marginLeft: 7
  },
  scheduleContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 80,
    backgroundColor: theme.white,
    marginTop: 20
  }

};
