import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', justifyContent: 'space-between', flexGrow: 1}],
  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
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
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  paddingContent: [contentContainerStyle],
  payee: {
    borderBottomColor: theme.separatorColor,
    borderBottomWidth: theme.separatorSize,
    paddingVertical: 15
  },
  payeeName: {
    fontWeight: theme.fontWeightMedium
  },
  payeeBank: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5
  },
  availableBalanceText: [
    textLightGreyStyle,
    {fontSize: theme.fontSizeNormal}
  ],
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  darkLineFull: {
    borderTopWidth: 2,
    borderColor: theme.darkGrey,
    marginTop: 20
  },
  greyLineFull: {
    borderTopWidth: 10,
    borderColor: theme.greyLine,
    paddingBottom: 10
  },
  footerContainer: {
    paddingVertical: 10,
    marginTop: 30,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey
  },
  row: {
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  infoTextContainer: {
    flex: 1
  },
  info: [textLightGreyStyle, {
    fontSize: theme.fontSizeSmall
  }],
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
};
