import {theme} from '../../styles/core.styles';

export default {
  progressBar: {
    flexDirection: 'row',
    height: 7,
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  buttonOtpSubmit: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  emoneyTitle: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingBottom: 15,
    paddingTop: 25
  },
  upperContainer: {
    paddingHorizontal: 20
  },
  viewContainer: {
    marginBottom: 20
  },
};