import {fontSizeSmallStyle, bold} from '../../../styles/common.styles';
import {theme} from '../../../styles/core.styles';

export default {
  contactsPicker: {
    ...fontSizeSmallStyle,
    ...bold,
    color: theme.brand,
  },
  containerStyle: {
    alignSelf: 'flex-end',
    paddingTop: 5
  }
};
