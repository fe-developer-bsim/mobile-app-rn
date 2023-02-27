import {bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
    paddingVertical: theme.padding
  },
  accNo: [bold, {
    color: theme.black,
    fontFamily: theme.roboto
  }],
  product: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  wallet: {
    color: theme.wallet,
    marginRight: 10
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
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
  timeInitiate: {
    paddingBottom: 15,
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  purchase: {
    color: theme.purchase,
    marginRight: 10,
  },
};