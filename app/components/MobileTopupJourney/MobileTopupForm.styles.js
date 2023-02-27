import {contentContainerStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 10
  },
  formContainer: {
    flex: 1
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal
  },
  contactPicker: {
    paddingVertical: 20
  }
};
