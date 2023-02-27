import {theme} from '../../../styles/core.styles';
import {Platform} from 'react-native';

export default {
  disabledColor: theme.textGrey,
  enabledColor: theme.green,
  enabledColorBrand: theme.brand,
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : 7
  }
};
