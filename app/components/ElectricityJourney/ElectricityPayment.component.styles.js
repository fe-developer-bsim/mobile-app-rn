import {flexRow, flex_1, contentContainerStyle, cardVerticalSpacingStyle, cardRightText, textLightGreyStyle, fontSizeMediumStyle, fontSizeSmallStyle, fontSizeNormalStyle, buttonLargeTextStyle, bold} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],

  containerContent: [{
    paddingBottom: 30
  }],

  title: [
    fontSizeMediumStyle,
    bold
  ],

  subTitle: [
    fontSizeNormalStyle,
    bold
  ],

  availableBalanceText: [
    fontSizeNormalStyle, textLightGreyStyle
  ],

  verticalSpacing: cardVerticalSpacingStyle,

  availableTokenText: [
    fontSizeNormalStyle,
    bold,
    {paddingBottom: 10}
  ],

  paymentAmountText: [
    fontSizeNormalStyle,
    cardVerticalSpacingStyle
  ],

  totalAmountText: fontSizeNormalStyle,

  rowContainer: flexRow,

  halfWidth: flex_1,

  billAmountText: [
    bold,
    cardRightText,
    fontSizeMediumStyle
  ],

  billDetailText: [
    bold,
    fontSizeSmallStyle
  ],

  billDetailContainer: [
    flexRow,
    cardVerticalSpacingStyle
  ],

  billDetailTitle: textLightGreyStyle,

  billDetailValue: [
    bold,
    cardRightText
  ],

  nextButton: buttonLargeTextStyle,

  denomText: {
    paddingVertical: 5
  }
};
