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
    justifyContent: 'center',
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
  halfWidthContainer: {
    flex: 1,
    justifyContent: 'space-between'
  }
};
