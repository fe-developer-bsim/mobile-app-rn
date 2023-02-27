import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  contentContainerStyle: [contentContainerStyle],
  bodyContainerWithTerms: {
    flexGrow: 0.8,
    backgroundColor: theme.white,
    justifyContent: 'space-evenly',
  },
  loginFieldsContainer: {
    paddingHorizontal: 10,
    marginBottom: -5
  },
  loginFieldsContainerCel: {
    paddingHorizontal: 10,
    marginBottom: -10
  },
  buttonMainLogin: {
    color: theme.white,
  },
  upperContainer: {
    paddingHorizontal: 10,
  },
  whiteTextTitle: {
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
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
  pageTitle: {
    fontSize: theme.fontSizeSmall,
    paddingTop: 20,
    marginBottom: -11,
    paddingHorizontal: 10

  },
  typeLabel: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  textLabel: {
    color: theme.black,
    paddingTop: 5
  },
  textHeaderSpace: {
    paddingTop: 10
  }
};
