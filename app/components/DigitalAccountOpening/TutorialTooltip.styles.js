import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  redText: {
    fontFamily: theme.roboto,
    color: theme.brand,
    fontWeight: theme.fontWeightBold,
    marginTop: 5
  },
  contentText: {
    color: theme.black,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    lineHeight: 20
  }
};
