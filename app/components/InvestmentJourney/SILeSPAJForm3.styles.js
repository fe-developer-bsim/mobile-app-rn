import {theme, bold} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';

export default {
  fieldsContainerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  SilTitleHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  SilTitleHeader: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
  },
  wallet: {
    color: theme.wallet
  },
  rowWallet: {
    flexDirection: 'row',
  },
  mr10: {
    marginRight: 10
  },
  titleWallet: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  roboto: {
    fontFamily: 'roboto',
  },
  labelSpacing: {
    paddingVertical: 10
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  styleRedMessageError: [
    bold,
    {
      fontSize: theme.fontSizeNormal,
      paddingTop: 20,
      paddingRight: 20,
      color: theme.brand}
  ],
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, styles.contentContainerStyle],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  mainTitleText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 25
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingTop: 20,
    fontSize: theme.fontSizeNormal,
    paddingHorizontal: 20,
    marginBottom: -10
  },
  fieldContainers: {
    borderColor: theme.white,
    paddingTop: 20,
    fontSize: theme.fontSizeNormal,
    marginBottom: -10
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
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
  redText: {
    color: theme.brand,
  },
  row: {
    flexDirection: 'row',
  },
  errIcon: {
    color: theme.brand,
    paddingRight: 5,
    paddingTop: 3,
  },
  lineGrey: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  formHeaderWithSpace: {
    paddingTop: 20
  },
};