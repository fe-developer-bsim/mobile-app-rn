import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const trueWidth = (width - 150);

export default {
  container: [contentContainerStyle, {backgroundColor: theme.white}],
  containerContent: [{alignItems: 'stretch'}],
  containerWhite: {
    backgroundColor: theme.white,
    maxHeight: height - 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  titleContainer: {
    height: 10 * height / 100,
  },
  containerForm: {
    height: 50 * height / 100,
  },
  disclaimerContainer: {
    height: 10 * height / 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: theme.greyLine
  },
  buttonNext: {
    height: 15 * height / 100,
    paddingVertical: 2,
    marginBottom: 50,
    paddingBottom: 50
  },
  field: {
    paddingBottom: 20
  },
  iconView: {
    alignItems: 'center',
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  disclaimerText: {
    marginTop: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginLeft: 10,
    paddingBottom: 20,
  },
  disclaimerTxt: {
    fontSize: 12,
  },
  disclaimerText1: {
    flexDirection: 'row',
  },
  disclaimerTxt1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.red,
    alignItems: 'center',
    marginLeft: 20
  },
  amountText: {
    color: theme.red
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    borderRadius: 10,
    backgroundColor: theme.brand,
    width: 18,
    height: 18,
    marginBottom: 10,
    marginRight: 10
  },
  numberText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto'
  },
  roboto: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  rowText: {
    flexDirection: 'row',
    width: trueWidth
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 40,
  },
  detailTitleContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  overlayContainer: {
    borderRadius: 80,
  },
  bold: {
    fontWeight: theme.fontWeightMedium,
    color: theme.black,
  },
  greyLine: {
    borderWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainerSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingHorizontal: 20
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.greyLine
  },
  borderShadow: {
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: theme.greyLine,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 5,
    marginTop: 10
  },
  rowPicker: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  firstRowPicker: {
    width: width * 10 / 100,
  },
  centerRowPicker: {
    width: width * 65 / 100,
    paddingHorizontal: 20,
  },
  lastRowPicker: {
    width: width * 10 / 100,
  },
  roundedText: {
    borderRadius: 50,
    borderWidth: 1,
    height: 40,
    width: 40,
    borderColor: theme.white,
    backgroundColor: theme.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRound: {
    color: theme.white,
    fontSize: theme.fontSize20,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  titlePicker: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  pickerLabel: {
    fontWeight: 'bold',
  },
  hide: {
    height: 0,
    width: 0,
    marginLeft: 10000
  },
  errText: {
    color: theme.red
  },
  termsText: {
    marginBottom: 10,
  },

  container1: [contentContainerStyle, {
    backgroundColor: theme.white,
  }],
  containerContent1: [{alignItems: 'stretch', justifyContent: 'center', flexGrow: 1, paddingBottom: 30, backgroundColor: theme.white}],
  title1: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 10
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greyLine1: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  paddingContent: {
  },
  payee: {
    borderBottomColor: theme.separatorColor,
    borderBottomWidth: theme.separatorSize,
    paddingVertical: 15
  },
  payeeName: {
    fontWeight: theme.fontWeightMedium
  },
  payeeBank: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5
  },
  availableBalanceText: {
    color: theme.black,
    fontFamily: 'Roboto',
    marginTop: 5
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  moreMenu: {
    color: theme.black
  },
  fieldContainer: {
    maxHeight: 100,
    width: 0.8 * width,
    borderWidth: 1,
    borderColor: theme.greyLine,
    borderRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.transparent,
  },
  center: {
    marginLeft: -5
  },
  iconAmount: {
    backgroundColor: theme.green,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  labelSpacing: {
    marginBottom: 25,
    marginTop: 10
  },
  textAmount: {
    fontSize: theme.fontSize22,
    color: theme.black,
    fontFamily: 'roboto',
  },
  textAmount1: {
    fontSize: theme.fontSize20,
    color: theme.black,
    fontFamily: 'roboto',
  },
  iconWallet: {
    color: theme.wallet,
    paddingRight: 10,
  },
  iconMerch: {
    marginRight: 15,
    width: 80,
    height: 25,
  },
  sourchAccount: {
    marginRight: -50,
    marginLeft: 5
  },
  paddingVer: {
  },
  amount: {
    fontSize: theme.fontSize22,
    width: 0.7 * width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  textGrey: {
    fontFamily: 'roboto',
    color: theme.grey,
    fontWeight: theme.fontWeightBold
  },
  down: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textOptional: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },

  paddingHor: {
    paddingHorizontal: 30,
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendAccNumber: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
  }],
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },

  blackText: {
    color: theme.black,
  },
  merchText: {
    color: theme.black,
    fontWeight: 'bold',
  },
  left: {
    marginLeft: -5,
  },
  container2: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingTop: 90,
  },
  buttonLargeTextStyle: {
    color: theme.white
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  arrowIcon: {
    color: theme.red,
    paddingLeft: 120,
  },
  codeBorder: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: theme.white,
    paddingVertical: 20,
    paddingLeft: 20
  },
  imageLeft: {
    width: width * 75 / 100,
  },
  titleCode: {
    fontSize: 13,
  },
  containerWhite1: {
    backgroundColor: theme.white,

  },
  containerMenu: {
    paddingVertical: 20
  },
  whiteBottom: {
    backgroundColor: theme.white
  },
  opacity: {
    opacity: 0.8,
  },
  padding: {
    padding: 20
  },
  upperContainer: {
    flex: 1,
  },
  lowerContainer: {
    padding: 20,
    flex: 2,
    justifyContent: 'space-between',
  },
  rowDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  dropDownContainer: {
    paddingBottom: 20,
  },
  dropDown: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listDropDown: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  carouselContainer: {
    backgroundColor: theme.white,
    padding: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2.5},
    elevation: 4
  },
  footer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.borderGrey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
    alignSelf: 'center'
  },
  rightContainer: {
    width: 150,
    alignSelf: 'center'
  },
  uname: {
    marginBottom: 20,
    textAlign: 'center',
    color: theme.white,
    fontFamily: theme.roboto,
    fontSize: theme.fontSize20,
  },
  polis: {
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingVertical: 5
  },
  noPolis: {
    fontSize: theme.fontSize20,
    color: theme.white,
    fontFamily: theme.roboto,
  },
  keys: {
    fontSize: theme.fontSizeNormal,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    fontWeight: theme.fontWeightLight
  },
  values: {
    fontSize: theme.fontSizeNormal,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    textAlign: 'right',
    fontWeight: theme.fontWeightRegular
  },
  detailTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: theme.fontWeightLight
  },
  detailValues: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingRight: 10,
    textAlign: 'right',
    fontWeight: theme.fontWeightRegular
  },
  textFooter: {
    fontSize: theme.fontSizeSmall,
    color: theme.lightBlack,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: theme.fontWeightLight
  },
  listNoPolis: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightRegular
  },
  noPolisIcon: {
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
    color: theme.white,
    transform: [{rotate: '90deg'}],
  },
  footerIcon: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  checked: {
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
    color: theme.green
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: height / 1.2,
    padding: 20,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.grey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    backgroundColor: theme.white,
    shadowColor: theme.greyLine,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 35,
    height: 2,
    backgroundColor: theme.grey,
    marginBottom: 20,
  },
  subPanelHandle: {
    width: 30,
    height: 2,
    backgroundColor: theme.grey,
    marginBottom: 2,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  offsetOpacity: {
    backgroundColor: theme.black
  },
  withDrawEmergencyFundButton: {
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.darkRed,
    marginTop: 10,
  },
  withDrawEmergencyFundText: {
    color: theme.red,
    fontWeight: 'bold',
  },
  middleContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    top: -24,
  },
  topUpButton: {
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.green,
  },
  topUpText: {
    color: theme.green,
    fontWeight: 'bold',
  },
  backgroundImageTopUp: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  rowAtten: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textFooterAtten: {
    fontSize: theme.fontSizeSmall,
    color: theme.lightBlack,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 25,
    fontWeight: theme.fontWeightLight
  },
  footerIconAtten: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  carouselContainerEmFund: {
    backgroundColor: theme.white,
    padding: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2.5},
    elevation: 4,
    marginTop: -150,
    width: Dimensions.get('window').width * 0.94,
    alignSelf: 'center',
    borderRadius: 5
  },
  backgroundImageEmFund: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    paddingBottom: 150,
  },
  withdrawalText: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  textSider: {
    alignSelf: 'center',
    fontFamily: 'roboto',
    color: theme.black,
    lineHeight: 20,
  },
  textSiderValue: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    lineHeight: 30,
    fontWeight: 'bold'
  },
  continueEmFundView: {
    marginVertical: 20,
  },
  continueEmFund: {
  },
  continueEmFundText: {
    color: theme.white,
  },
  halfWidth: {
    flex: 1,
    width: Dimensions.get('window').width * 1,
    alignSelf: 'center',
  },
  fullContainer: [
    {
      justifyContent: 'space-between',
      flexGrow: 1
    }
  ],
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
  rightIcon: {
    paddingHorizontal: 20,
  },
  headerIcon: {
    color: theme.amount,
  },
  plus: {
    color: theme.black,
  },
  containerAmountText: {
    color: theme.lightGrey,
    fontFamily: 'Roboto',
  },
  timeInitiate: {
    paddingTop: 30
  },
  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'flex-start'
  },
  greyDot: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5,
    marginTop: 10
  },
  containtextExplanation: {
    padding: 20,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: theme.softGrey,
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  bottomSpacing: {
    marginBottom: 20,
  },
  explainIcon: {
    color: theme.black,
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
  emFundBtnConfirm: {
    marginTop: 50
  },
  formAmount: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title2: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  textMinAmount: {
    marginBottom: 20,
  },
  textPicker: {
    fontSize: theme.fontSizeLarge,
    color: theme.black
  },
  middleContainerSlider: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rpText: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  amountTextSlider: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  sliderContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  minimumAmount: {
    alignItems: 'flex-start'
  },
  maximumAmount: {
    alignItems: 'flex-end'
  },
  footerEmFund: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.borderGrey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: 'row',
  },
  iconText: {
    color: theme.white,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeSmall
  }
};
