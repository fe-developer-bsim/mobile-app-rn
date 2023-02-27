import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeMediumStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  headerIcon: {
    color: '#4ed07d',
    paddingRight: 10
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  paddingContent: [contentContainerStyle],
  availableBalanceText: {
    fontFamily: 'roboto',
    color: theme.black,
    paddingTop: 5
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  checkboxContainer: {
    paddingVertical: 10,
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingHorizontal: 20
  },
  checkboxLabel: {
    color: theme.darkBlue
  },
  checkboxStyle: {
    width: 20,
    height: 20
  },
  textInputContainerPadding: {
    backgroundColor: theme.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputAmount: {
    flex: 1,
    flexDirection: 'row'
  },
  amountField: {
    textAlign: 'center',
    flex: 1,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginLeft: 30
  },
  editIcon: {
    paddingRight: 10,
    paddingTop: 10
  },
  walletIcon: {
    color: '#c38a05',
    paddingRight: 10
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 20
  },
  sendAccountDetailContainer1: {
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 20
  },
  sendAccNumber: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
  }],
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  containerGreyline: {
    paddingVertical: 10,
  },
  greyLine: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 20
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  black: {
    color: theme.black,
  },
  buttonBottom: {
    paddingBottom: 30,
    padding: 20,
  },
  containerDiv: {
    paddingHorizontal: 10
  },
  containerDivSchedule: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  containerDivAcc: {
    padding: 20,
  },
  rowLeft: {
    flex: 0.3,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.darkOrange,
    alignItems: 'center'
  },
  rowRight: {
    flex: 0.7,
    paddingHorizontal: 5,
    paddingBottom: 0,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.darkOrange,
  },
  rowRight2: {
    flex: 0.7,
    paddingHorizontal: 5,
    paddingBottom: 0,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.darkOrange,
  },
  inputStyleCenter: [bold, fontSizeMediumStyle, {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black
  }],
  textInputAmountValas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: theme.black
  },
  exchangeRates: {
    alignItems: 'flex-end',
    paddingTop: 10
  },
  picker: {
    marginTop: 15
  },

  // REMITTANCE
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
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
    top: width * -0.23
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
    marginBottom: 20,
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
  container: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  explainIcon: {
    color: theme.darkBlue,
    paddingRight: 10,
    paddingTop: 5
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100,
    color: theme.textSoftDarkBlue
  },
  containerDivNotice: {
    paddingVertical: 20,
    padding: 20,
  },
  headerRowNotice: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: theme.white,
  },
  contentPayment: {
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.white,
  },
  containerHistory: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20
  },
  imgIcon: {
    width: ((width - 40) * 0.3) / 2,
    height: ((width - 40) * 1) / 8.5,
    marginRight: 10,
  },
  sendIcon: {
    color: theme.black,
    marginRight: 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.lightPink
  },
  subNo: [bold, {
    fontFamily: 'roboto',
    color: theme.darkBlue
  }],
  subtext: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.textSoftDarkBlue,
    fontFamily: 'roboto',
  },
  subtextAmount: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.softGrey,
    fontFamily: 'roboto',
    paddingTop: 18
  },
  subtextCurrencyLabel: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.textSoftDarkBlue,
    fontFamily: 'roboto',
  },
  subtextCurrency: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.softGrey,
    fontFamily: 'roboto',
    paddingBottom: 10
  },
  accountText: {
    flexDirection: 'row',
    marginRight: width * 0.5
  },
  containerAcc: {
    paddingRight: width * 0.2
  },
  detailTransactionText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5    
  },
  detailTransactionTextDebited: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  colorDetailText: [{
    color: theme.darkBlue,
    fontFamily: 'roboto',
  }],
  colorDetailTextDebited: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    fontWeight: 'bold'
  },
  containerUtama: {
    flex: 1
  },
  CurrencyText: [fontSizeLargeStyle, bold, {
    color: theme.black,
    paddingVertical: 18
  }],
  containerAmountText: {
    paddingTop: 18
  },

  //  New
  flexGrey: {
    backgroundColor: theme.superlightGrey
  },
  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 12,
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
  rowInformation: {
    marginBottom: height * 0.015
  },
  textBonusReward: {
    marginTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginHorizontal: width * 0.009,
  },
  paddingBox: {
    marginHorizontal: width * 0.05,
    paddingTop: 10
  },
  paddingBoxTwo: {
    paddingBottom: 40
  }
};
