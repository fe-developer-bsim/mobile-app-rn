import {bold} from '../../../styles/common.styles';
import {theme} from '../../../styles/core.styles';

export default {
  container: {
    paddingTop: theme.padding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  wallet: {
    color: theme.wallet,
    marginRight: 10,
  },
  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },
  labelSpacing: {
    marginBottom: 25
  },
  row2: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roboto: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  accNo: [bold, {
    color: theme.black
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
    color: theme.black
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  mb10: {
    marginBottom: 5
  }
};
