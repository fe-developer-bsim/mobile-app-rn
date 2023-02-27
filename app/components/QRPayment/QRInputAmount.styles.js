import {flexRow, flex_1, contentContainerStyle, cardVerticalSpacingStyle, cardRightText, textLightGreyStyle, fontSizeMediumStyle, fontSizeSmallStyle, fontSizeNormalStyle, buttonLargeTextStyle, bold, fontSizeLargeStyle, textAlignCenter} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Platform} from 'react-native';

export default {
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

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

  flex1: flex_1,

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
  },

  amountContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  fieldContainer: {
    flex: 9
  },

  currencySymbol: [
    fontSizeLargeStyle,
    textAlignCenter,
    {
      backgroundColor: theme.inputBackground,
      marginTop: 10,
      padding: 10,
      height: Platform.OS === 'ios' ? 50 : 59,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  ],
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    marginTop: 25,
    marginBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
};
