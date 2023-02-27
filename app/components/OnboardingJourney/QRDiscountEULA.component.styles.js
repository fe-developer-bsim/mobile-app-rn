import {contentContainerStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    flex: 1,
    backgroundColor: theme.white,
  }],
  nextButton: buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20
  },
};
