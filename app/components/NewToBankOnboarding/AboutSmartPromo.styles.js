import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [styles.contentContainerStyle, {
    flex: 1,
    backgroundColor: theme.white
  }],
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20
  }
};
