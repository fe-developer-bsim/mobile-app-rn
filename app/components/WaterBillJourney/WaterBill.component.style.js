import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, bold} from '../../styles/common.styles';

export default {
  containerStyle: {
    flex: 1
  },
  tabBarMargin: {
  },
  background: {
    backgroundColor: theme.contrast
  },
  verticalSpacing: {
    paddingVertical: 20
  },
  horizontalSpacing: {
    paddingHorizontal: 20
  },
  bottomSpacing: [{
    paddingBottom: 22
  }, bold, fontSizeMediumStyle],
  labelSpacing: [{
    paddingBottom: 9
  }, bold, fontSizeMediumStyle],
  topSpacing: {
    paddingTop: 20
  },
  inputFontSize: {
    fontSize: theme.fontSizeNormal
  },
  buttonNext: {paddingBottom: 20}
};
