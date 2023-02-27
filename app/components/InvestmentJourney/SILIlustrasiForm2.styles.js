import {theme} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.white
  },
  contentContainerStyle: [contentContainerStyle],
  bodyContainerWithTerms: {
    backgroundColor: theme.white,
    justifyContent: 'space-evenly',
  },
  loginFieldsContainerCel: {
    paddingHorizontal: 10,
    marginTop: 20
  },
  choosePeriod: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: -15
  },
  cameraIconStyle: {position: 'absolute', width: 40, left: 0, top: 35, paddingHorizontal: 10},
  buttonMainLogin: {
    color: theme.white,
  },
  upperContainer: {
    paddingHorizontal: 10,
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
    height: 7,
  },
  emoneyTitle: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 25
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
  buttonOtpSubmit: {
    paddingTop: 50,
    paddingHorizontal: 30,
    marginBottom: 20
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  pageTitleName: {
    marginBottom: 5,
    paddingHorizontal: 10
  },
  titleNameCurrency: {
    fontSize: theme.fontSizeNormal,
    paddingBottom: 20,
    color: theme.black,
    paddingHorizontal: 10
  },
  pageTitle: {
    fontSize: theme.fontSizeNormal,
    paddingTop: 20,
    marginBottom: -11,
    paddingHorizontal: 10
  },
  moneyInsured: {
    paddingTop: 30,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  titleNameProduct: {
    fontSize: theme.fontSizeNormal,
    paddingBottom: 20,
    color: theme.black,
    paddingHorizontal: 10
  },
  titleDate: {
    fontSize: theme.fontSizeNormal,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  titleCurrentDate: {
    fontSize: theme.fontSizeNormal,
    paddingBottom: 20,
    color: theme.black,
    paddingHorizontal: 10
  },
  titleTypeFund: {
    fontSize: theme.fontSizeNormal,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  typeFund: {
    fontSize: theme.fontSizeNormal,
    paddingBottom: 20,
    color: theme.black,
    paddingHorizontal: 10
  },
  invesRadioButton: {
    paddingHorizontal: 10,
  },
  buttonLargeTextStyle,
  redText: {
    color: theme.brand,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: theme.fontSizeSmall,
    flexDirection: 'column',

  },
  row: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 20
  },
  errIcon: {
    paddingRight: 10,
    paddingHorizontal: 7,
    paddingTop: 3,
    color: theme.brand
  },
  rateInvest: {
    paddingHorizontal: 10,
    paddingBottom: 15
  }
};
