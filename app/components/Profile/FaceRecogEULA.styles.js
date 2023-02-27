import {contentContainerStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [
    contentContainerStyle,
    {
      justifyContent: 'space-between',
      flexGrow: 1,
      paddingBottom: 20,
    }
  ],
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  textBold: [
    fontSizeMediumStyle, bold,
  ],
  textReg: [
    fontSizeMediumStyle,
    {

    }
  ],
  buttonText: [
    fontSizeMediumStyle,
    {
      color: theme.white,
    }
  ],
  buttonAgree: {

  }
};