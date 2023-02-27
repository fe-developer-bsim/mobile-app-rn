import {theme} from '../../styles/core.styles';
import {contentContainerStyle, textLightGreyStyle, fontSizeSmallStyle, cardVerticalSpacingStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flexGrow: 1}],
  formContainer: {
    flex: 1,
    paddingBottom: 25
  },
  formHeader: {
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal,
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
    fontSizeSmallStyle,
    textLightGreyStyle
  ]
};
