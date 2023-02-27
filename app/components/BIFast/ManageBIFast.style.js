import {theme} from '../../styles/core.styles';
import {bold, fontSizeLargeStyle, fontSizeSmallStyle, containerWhiteStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
export default {
  container: {
    marginHorizontal: width * 0.029,
    paddingVertical: 10
  },

  containerContent: [{justifyContent: 'space-between'}],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerIcon: {
    color: theme.amount,
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
  greyDot: {
    color: theme.grey,
    marginLeft: 35,
    marginBottom: 5
  },
  accDetail: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginLeft: 5
  },
  imgIconFrom: {
    width: ((width - 40) * 0.2) / 2,
    height: ((width - 40) * 1) / 8.5,
    marginRight: 18,
    marginTop: 5,
    marginLeft: 6
  },
  imgIcon: {
    width: ((width - 40) * 0.3) / 2,
    height: ((width - 40) * 1) / 8.5,
    marginRight: 10,
    marginTop: 5,
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
    color: theme.textSoftDarkBlue
  },
  title: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontWeight: 'bold',
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
    marginRight: width * 0.25
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
    flex: 1,
    backgroundColor: theme.superlightGrey,
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
  containerGreyline: {
    paddingVertical: 10,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  information: {
    color: theme.brand,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.textSoftDarkBlue
  },
  containtextExplanation: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: theme.white,
    borderRadius: 10
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.textSoftDarkBlue,
    fontFamily: 'Roboto',
    width: width * 0.8,
    marginLeft: 10
  },
  explainIcon: {
    color: theme.darkBlue
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
    marginBottom: 20
  },
  detailContainer: {
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black,
  },
  containerRowRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingTop: 10
  },
  currencyFont: [bold, {fontFamily: 'Roboto', color: theme.black}],

  // Remittance
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.25
  },
  containerTransfer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginHorizontal: 0,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    top: width * -0.2
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
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  border: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.white,
    marginHorizontal: -2
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accNumberContainer: {
    // marginBottom: 20,
  },
  accNumber: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.lightPurple,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 76
  },
  marginTop: {
    marginTop: 50
  },
  container2: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  rowLeft: {
    flex: 0.3,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    alignItems: 'center',
    paddingVertical: 10
  },
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.7,
    paddingHorizontal: 5,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  detailTransactionText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5   
  },
  detailTransactionTextDebited: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  colorDetailText: [{
    color: theme.darkBlue,
    fontFamily: 'roboto',
    marginRight: 10,
    textAlign: 'left',
  }],
  colorDetailTextTrx: [{
    color: theme.darkBlue,
    fontFamily: 'roboto',
    paddingVertical: 5
  }],
  colorDetailTextRight: [{
    color: theme.darkBlue,
    fontFamily: 'roboto',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: theme.fontSizeSmall,
  }],
  colorDetailTextRight2: [{
    color: theme.darkBlue,
    fontFamily: 'roboto',
    textAlign: 'right',
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: theme.fontSizeSmall,
    fontWeight: 'bold'
  }],
  colorDetailTextDebited: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
  textInputAmountValas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerWhite: [
    containerWhiteStyle, {
      borderRadius: 10,
      paddingHorizontal: 20,
      // paddingVertical: 10
    }],
  infoText: {
    paddingVertical: 10,
  },
  infoTextTrue: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  infoText2: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    paddingTop: 80
  },
  detailSenderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailSenderText3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailSenderText2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  amountTextTitleContent: {
    paddingVertical: 10
  },
  amountTextTitle: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium
  },
  CurrencyText: [fontSizeLargeStyle, {
    color: theme.darkBlue,
  }],
  AmountText: [fontSizeLargeStyle, {
    color: theme.darkBlue,
  }],
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.white,
  },
  button: {
    fontWeight: 'bold'
  },
  containerDetailRecipient: {
    paddingRight: 5
  },
  containerDetailRecipient2: {
    paddingRight: 75
  },
  containerRecep: {},
  containerContentBody: [{flexGrow: 1, justifyContent: 'space-between', backgroundColor: theme.superlightGrey}],
  baru: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    marginHorizontal: 20,
    borderRadius: 20
  },

  // NEW
  containerUtama: {
    flex: 1
  },
  flexGrey: {
    backgroundColor: theme.superlightGrey
  },
  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 4 : height / 4,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  containerBannerWhite: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    marginTop: Platform.OS === 'ios' ? height * 0.01 : height * 0.02, 
  },
  rowInformation: {
    flexDirection: 'row',
    marginBottom: height * 0.015
  },
  textBonusReward: {
    marginTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginHorizontal: width * 0.009,
  },
  paddingBox: {
    marginHorizontal: width * 0.04,
    paddingTop: 10,
  },
  paddingBoxTwo: {
    paddingBottom: 40
  },

  // NEW
  rowContainerHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: width * 0.029,
  },
  pr10: {
    alignItems: 'flex-end',
  },
  pl10: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: width * 0.029,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: width * 0.15,
  },
  subTitleText: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
  },
  subTitleTextTwo: {
    textAlign: 'right',
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: theme.fontSizeSmall,
  },
  informationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
    flexWrap: 'wrap',
  },
  informationItemTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  containerRekening: {
    paddingVertical: 5
  },
  containerAcc: {
    marginRight: width * 0.25
  },
  containerDiv: {
    paddingVertical: 20,
    padding: 20,
  },
  title2: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  captionText: {
    color: theme.darkBlue,
    fontFamily: theme.robotoLight,
    textAlign: 'center',
  },
  bgWhite: {
    backgroundColor: theme.white,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    paddingRight: width * 0.22,
    paddingVertical: 10
  },
  rowAccount: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    // justifyContent: 'center',
    // minWidth: 60,
    alignItems: 'center'
  },
  imageOffer2: {
    width: 85,
    height: 85
  },
  pad2: {
    paddingVertical: 1
  },
  accTxt2: [bold, {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  }],
  typeTxt: {
    color: theme.darkBlue
  },
  menu: {
    marginVertical: 25,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle2: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue,
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  couponOutline: {
    color: theme.darkBlue
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  containerHeader: {
    // paddingVertical: 20,
    marginHorizontal: width * 0.029,

    // marginHorizontal: width * 0.03,
    // paddingHorizontal: 20,
  },
  boxAmount: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.blueAmount,
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingLeft: 15,
    marginTop: 30,
    paddingVertical: 10
  },
  buttonDisabled: {
    fontSize: theme.fontSizeMedium,
    color: theme.grey,
    fontFamily: 'Roboto',
  },
  arrowDisabled: {
    color: theme.grey
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    borderColor: theme.grey,
    backgroundColor: theme.transparent,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.04,

  },
  billerDetailsRemittance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingLeft: 10
  },
  dontHave: {
    marginHorizontal: width * 0.2,
    marginBottom: 40
  },
  backButton: {
    transform: [{rotate: '180deg'}],
    color: theme.white,
    fontWeight: 'bold'
  },
  scan: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  textScan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.white,
    alignSelf: 'center',
    marginLeft: width / 10
  },
  textScanFaq: {
    fontSize: 13,
    color: theme.white,
    alignSelf: 'center',
    marginLeft: width / 5,
    borderWidth: 1,
    borderColor: theme.white,
    borderRadius: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 10,
  },
  topBg: {
    width: width,
    height: Platform.OS === 'android' ? 60 : 80,
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20,
    marginTop: 10
  },
};
