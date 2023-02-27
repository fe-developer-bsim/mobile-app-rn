import {theme} from '../../styles/core.styles';
import {textLightGreyStyle, fontSizeSmallStyle, cardVerticalSpacingStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';

export default {
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 40}],
  formContainer: {
    paddingBottom: 25
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  paddingContent: {
    paddingHorizontal: 20
  },
  payee: {
    borderBottomWidth: theme.separatorSize,
    borderBottomColor: theme.separatorColor,
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
  information: [
    fontSizeSmallStyle,
    {
      color: theme.brand,
    }],
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  subtext: [
    {fontWeight: theme.fontWeightLight},
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  fieldAmount: {
    paddingTop: 15
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'}
};
