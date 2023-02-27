import {theme} from '../../styles/core.styles';
import {bold} from '../../styles/common.styles';

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
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mr10: {
    marginRight: 10
  },
  textInputContainerPadding: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 20
  },
  colorTextAmount: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    marginRight: 50
  },
  textInputAmount: [bold, {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  colorText: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
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
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  padding10: {
    paddingTop: 20,
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: theme.white
  },
  padding: {
    padding: 20
  },
  upperContainer: {
    flex: 1,
    paddingTop: 10,
  },
  rowDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingBottom: 10,
    flex: 2,
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
  leftContainer: {
    width: 100,
    alignSelf: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15

  },
  rightContainer: {
    width: 150,
    alignSelf: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15
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
  detailTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    paddingLeft: 30,
    fontWeight: theme.fontWeightLight,
    textAlign: 'left',
  },
  detailTitle2: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingLeft: 30,
    textAlign: 'left',
    fontWeight: theme.fontWeightBold
    
  },
  detailValues: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    paddingLeft: 40,
    textAlign: 'left',
    fontWeight: theme.fontWeightBold
  },
  detailValues2: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingLeft: 40,
    textAlign: 'left',
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
  title: {
    marginTop: 20,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    marginBottom: 10
  },
  labelSpacing: {
    paddingVertical: 10
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
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  ph10: {
    paddingHorizontal: 10
  },
  rowBalance: {
    flexDirection: 'row',
    marginBottom: 20
  },
  infoMulti: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  infoTittleCurrency: {
    paddingHorizontal: 10
  },
  checkboxContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: -15
  },
  textCurrency: {
    color: theme.brand,
    marginRight: 5,
  },
};
