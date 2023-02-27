import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

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
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
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
    backgroundColor: 'white'
  },
  bottomSpacing: {
    paddingVertical: 160,
  },
  containerHeightStyle: {
    flex: 1,
    justifyContent: 'space-between',
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
    justifyContent: 'center',
  }],
  amountText1: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
    justifyContent: 'center'
  }],
  textAmount: {
    fontSize: theme.fontSize22,
    color: theme.black,
    fontFamily: 'roboto',
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 5,
    justifyContent: 'center',
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
  paddingVer: {
  },
  left: {
    marginLeft: -5,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  information: {
    color: theme.brand,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  textExplanationFee: {
    fontSize: theme.fontSizeSmall,
    color: theme.red
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.transparent,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10
  },
  containtextExplanationFee: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.transparent,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 5
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
    marginBottom: 20
  },
  detailContainer: {
  },
  mv5: {
    marginVertical: 5
  },
  buttonLargeTextStyle: {
    color: theme.white
  },
  buttonContainer2: {
    paddingTop: 70,
  },
  buttonContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  buttonContainer1: {
    paddingTop: 100,
  },
  bigContainer: {
    backgroundColor: 'white'
  },
  space: {
    flexDirection: 'row',
    fontSize: theme.fontSizeSmall,
    color: theme.red,
    fontFamily: 'Roboto',
    width: width - 200,
  },
  feeText: {
    color: theme.red,
    fontWeight: 'bold',
    fontSize: theme.fontSizeSmall,
  },
  iconText: {
    color: theme.white,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeSmall
  }
};
