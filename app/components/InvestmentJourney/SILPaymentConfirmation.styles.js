import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle],
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
  halfWidth: {
    flex: 1
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
  },
  amountText: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
  }],
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
  halfWidthContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomWrapper: {
    paddingTop: 70
  },
  infoMulti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  lineGrey: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  plus: {
    color: theme.black,
  }
};
