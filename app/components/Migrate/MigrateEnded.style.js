import {theme} from '../../styles/core.styles';
import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  contentContainerStyle: [contentContainerStyle],
  bodyContainerWithTerms: [{
    flexGrow: 1,
    backgroundColor: theme.red,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40
  }, contentContainerStyle],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  mainTitle: {
    fontSize: theme.fontSizeXL,
    paddingTop: 20,
    color: theme.black
  },
  subTitle: {
    fontSize: theme.fontSizeMedium,
    paddingTop: 5,
    color: theme.white
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
  titleFormat: {
    fontSize: theme.fontSizeXL,
    color: theme.white,
  },
  mainCheckLogo: {
    height: 50,
    width: 60,
  },
};
