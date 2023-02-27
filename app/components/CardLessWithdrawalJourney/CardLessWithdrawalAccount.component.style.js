import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle, {backgroundColor: theme.white, flex: 1}],
  title: {
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightRegular,
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconBlue: {
    color: theme.lightBlue,
    paddingRight: 10,
  }
};
