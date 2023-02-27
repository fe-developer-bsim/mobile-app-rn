import {theme} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  contentContainerStyle: [contentContainerStyle],
  bodyContainerWithTerms: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  bigBannerMigrate: {
    justifyContent: 'center',
    paddingTop: 30,
    width: 327,
    height: 130
  },
  mainTitle: {
    fontSize: theme.fontSizeXL,
    paddingTop: 20,
    color: theme.black
  },
  subTitle: {
    fontSize: theme.fontSizeMedium,
    paddingTop: 5,
    color: theme.black
  },
  buttonLargeTextStyle: buttonLargeTextStyle,
  containerBottomtext: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  contentText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  textTerm: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  alreadyHaveAcc: {
    color: theme.red,
    padding: 10,
    paddingVertical: 20,
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium
  },
  topContent: {
    paddingTop: 30
  }
};
