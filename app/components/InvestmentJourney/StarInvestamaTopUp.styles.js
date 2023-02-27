import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {fontSizeNormalStyle, bold} from '../../styles/common.styles';
const {width} = Dimensions.get('window');

export default {
  fieldsContainerWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  wallet: {
    color: theme.wallet
  },
  row: {
    flexDirection: 'row',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    color: theme.amount,
    marginTop: 5
  },
  mr10: {
    marginRight: 10
  },
  subTitle: [
    fontSizeNormalStyle,
    bold
  ],
  titleWallet: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  rowWallet: {
    flexDirection: 'row',
  },
  lineGrey: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  containerTipsAmount: {
    paddingBottom: 20,
    paddingTop: 5
  },
  rowCheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30
  },
  textCheckBox: {
    paddingLeft: 20,
    paddingRight: 25
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  padding10: {
    padding: 10 
  },
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
  roboto: {
    fontFamily: 'roboto',
  },
  accNo: [bold, {
    color: theme.black,
    fontWeight: theme.fontWeightBold
  }],
  name: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  product: {
    color: theme.black,
    fontFamily: theme.robotoLight,
    marginBottom: 5
  },
  balance: {
    color: theme.black,
    fontWeight: theme.fontWeightBold
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
  styleRedMessageError: [
    bold,
    {
      fontSize: theme.fontSizeNormal,
      paddingTop: 20,
      paddingRight: 20,
      color: theme.brand}
  ],
  backgroundImageEmFund: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
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
    color: theme.black
  },
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
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
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  rowErrors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redAmount: {
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  rateInvest: {
    paddingHorizontal: 20
  },
};
