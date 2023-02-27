import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {buttonLargeTextStyle} from '../../styles/common.styles';

const {width, height} = Dimensions.get('window');

export default {
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
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
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
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
    backgroundColor: theme.white,
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
    paddingRight: 20,
    paddingVertical: 5,
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
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  uname: {
    textAlign: 'center',
    color: theme.white,
    fontFamily: theme.roboto,
    fontSize: theme.fontSize20,
  },
  polis: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: theme.fontSizeNormal,
    color: theme.white,
    fontFamily: theme.robotoLight,
    paddingVertical: 5
  },
  noPolis: {
    fontSize: theme.fontSize20,
    color: theme.black,
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
    paddingLeft: 20,
    fontWeight: theme.fontWeightLight,
    paddingBottom: 10
  },
  detailTitle2: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 20,
    fontWeight: theme.fontWeightLight,
    paddingBottom: -10
  },
  detailSubTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    fontWeight: theme.fontWeightLight,
  },
  titleNameProduct: {
    paddingVertical: 5,
    paddingLeft: 20,
  },
  titleNameCurrency: {
    paddingVertical: 5,
    paddingLeft: 20,
  },
  typeFund: {
    paddingVertical: 5,
    paddingLeft: 20,
  },
  detailValues: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingRight: 10,
    textAlign: 'right',
    fontWeight: theme.fontWeightBold
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
    color: theme.black,
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
    height: height,
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
    marginBottom: 10,
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
    bottom: -15,
    width: 200,
    alignSelf: 'center',
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
    width: Dimensions.get('window').width * 0.90,
    alignSelf: 'center',
  },
  fullContainer: [
    {
      justifyContent: 'space-between',
      flexGrow: 1
    }
  ],
  title: {
    marginTop: 20,
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  labelSpacing: {
    paddingVertical: 10
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
  rightIcon: {
    paddingHorizontal: 20,
  },
  headerIcon: {
    color: theme.amount,
  },
  amountText: {
    fontFamily: 'Roboto',
    color: theme.black,
    alignSelf: 'center',
    fontWeight: theme.fontWeightMedium,
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
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 20
  },
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
    paddingHorizontal: 20
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
    paddingTop: 20,
    paddingBottom: 20,
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

  iconAmount: {
    lineHeight: 20,
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
  rowContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    bottom: 20
  },
  rpText: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  amount: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
    color: theme.textGrey
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
  textFooter2: {
    fontSize: theme.fontSizeSmall,
    color: theme.red,
    fontFamily: theme.roboto,
    paddingVertical: 10,
    paddingLeft: 10,
    fontWeight: theme.fontWeightLight,
    fontStyle: 'italic',
  },
  detailStar: {
    fontSize: theme.fontSizeNormal,
    color: theme.red,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    fontWeight: theme.fontWeightLight
  },
  rowText: {
    flexDirection: 'row'
  },
  boxedInfo: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    marginTop: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconColor: {
    color: theme.black,
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  detailsTxt: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  rowCheckBox: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 10
   
  },
  iconHealth: {
    color: theme.brand,
    paddingRight: 10
  },
  textCheckBox: {
    paddingLeft: 10,
    paddingRight: 30,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  checkBoxStyle: {
    height: 25,
    width: 25,
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  disclamer: {
    color: theme.blueAmount,
    textDecorationLine: 'underline',
  },
  buttonLargeTextStyle,
  titleNameDetail: {
    paddingVertical: 5,
    color: theme.black
  },
  rowCheckBox1: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingLeft: 20,
  },
  totalAmount: {
    paddingVertical: 5,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
  },
  rowDisclamer: {
    flexDirection: 'row',
    paddingLeft: 45,
  },
  rowCheckBoxRiplay: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 10,
    marginTop: 10,
  },
};
