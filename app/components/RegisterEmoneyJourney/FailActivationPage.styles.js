import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  containerContent: {
    backgroundColor: theme.white,
  },
  upperWrapper: {
    backgroundColor: theme.white,
    paddingBottom: 25
  },
  mainTitle: {
    paddingVertical: 20,
    maxWidth: (65 * width - 30) / 100,
  },
  mainCheckLogo: {
    height: 40,
    width: 60,
    marginTop: 15,
  },
  mainTitleLogo: {
    width: 150,
    height: 30,
    marginTop: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonNext: {
    paddingVertical: 10,
    paddingHorizontal: width / 11,
    width: width,
    marginTop: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingTop: 70,
    backgroundColor: theme.white,
    paddingBottom: 20
  },
  check: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20
  },
  middleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.white,
  },
  amountContainer: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceAccountContainer: {
    marginVertical: 5,
  },
  helpContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },

  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
    textAlign: 'center'
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto'
  },
  successText: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto'
  },
  transrefnum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    paddingTop: 30
  },
  transactionDate: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    marginTop: 30,
    marginRight: 20
  },
  receiptText: {
    color: theme.black,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
  },
  amountTitle: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight
  },
  amountText: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  sourceAccount: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
  },
  account: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  subTitle: {
    color: theme.black,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
  },
  redText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  description: {
    color: theme.textGrey,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  detailKey: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight
  },
  detailValue: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  token: {
    color: theme.brand,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  copy: {
    color: theme.brand,
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
  },
  logo: {
    paddingTop: 30,
  },
  logoSuccess: {
    paddingTop: 30,
    color: theme.green
  },
  logoFail: {
    paddingTop: 30,
    color: theme.lightGrey

  },
  ph20: {
    paddingHorizontal: 20
  }
};
