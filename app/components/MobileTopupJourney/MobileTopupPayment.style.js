import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
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
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  itemStyleContainer: {
    paddingVertical: 15,
    borderBottomColor: theme.text,
    borderBottomWidth: 0.5
  },
  availableBalance: {
    color: theme.textLightGrey,
    fontSize: theme.fontSizeNormal,
  },
  amount: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeNormal,
    paddingVertical: 10
  }
};
