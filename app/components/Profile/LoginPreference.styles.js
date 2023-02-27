import {contentContainerStyle, fontSizeNormal} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle],
  greyLine: {
    paddingBottom: 20,
    marginTop: 20,
    borderTopColor: theme.greyLine,
    borderTopWidth: 1
  },
  loginItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'center',
    minWidth: 60,
    alignItems: 'center'
  },
  icon: {
    color: theme.brand
  },
  loginType: {

  },
  loginTypeContainer: {
    justifyContent: 'center',
    maxWidth: 140,
    paddingTop: 5
  },
  title: [fontSizeNormal],
};
