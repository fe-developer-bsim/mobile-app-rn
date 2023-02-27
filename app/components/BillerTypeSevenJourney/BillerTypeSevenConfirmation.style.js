import {contentContainerStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rightItemHeader: [bold, {
    marginBottom: 2,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  titleText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },
  verticalSpacing: {
    paddingBottom: 40,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100,
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  explainIcon: {
    color: theme.black
  },
  amount: {
    color: theme.amount,
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
  amountText: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black
  }],
  detailAmtHide: {
    height: 0,
    width: 0,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  dateText: [bold, {
    fontFamily: 'Roboto',
    color: theme.black
  }],
  wallet: {
    color: theme.wallet
  },
  mr10: {
    marginRight: 10
  },
  roboto: {
    fontFamily: 'roboto',
  },
  accNo: [bold, {
    color: theme.black
  }],
  product: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  more: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
  },
  purchase: {
    color: theme.purchase,
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black
  },
  robotoLight: {
    fontFamily: theme.robotoLight,
    color: theme.black
  },
  poin: {
    height: 17,
    width: 50,
    paddingHorizontal: 10,
  },
  rowSimasPoin: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: 10
  },
  poinColapsible: {
    height: 10,
    width: 28,
    paddingHorizontal: 10,
  },
};
