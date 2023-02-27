import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20
  },
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tncTxt: [
    styles.fontSizeSmallStyle,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightRegular,
      color: theme.black
    }
  ],
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowNoSpace: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  checkboxStyle: {
    width: 15,
    height: 15
  },
};
