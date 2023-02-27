import {theme} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.white
  },
  contentContainerStyle: [contentContainerStyle],
  bodyContainerWithTerms: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  loginFieldsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  upperContainer: {
    paddingHorizontal: 10,
    flex: 8
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
  myInformation: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 10,
    paddingTop: 30
  },
  holderData: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 10,
    paddingTop: 30
  },
  SilTitleHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    flex: 0.5
  },
  SilTitleHeader: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
  },
  fieldsContainerWrapper: {
    color: theme.black,
    paddingTop: 10
  },
  buttonWrapper: {
    contentContainerStyle,
    paddingHorizontal: 30,
  },
  nextButton: [buttonLargeTextStyle, {
    fontFamily: 'Roboto',
  }],
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
