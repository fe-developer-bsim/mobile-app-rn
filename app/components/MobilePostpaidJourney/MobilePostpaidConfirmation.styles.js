import {cardRight, flexRow, fontSizeLargeStyle, textLightGreyStyle, buttonLargeTextStyle, flex_1, contentContainerStyle,
  cardVerticalSpacingStyle, paddingBottom, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  boldText: [bold, textLightGreyStyle],
  rightText: [bold, textLightGreyStyle, cardRight],
  largeText: [fontSizeLargeStyle],
  buttonStylePadding: [cardVerticalSpacingStyle, paddingBottom, {paddingVertical: 40}],
  buttonStyle: [buttonLargeTextStyle],
  container: [contentContainerStyle],
  itemContainer: [cardVerticalSpacingStyle],
  flex1: [flex_1],
  detailsContainer: [flexRow, cardVerticalSpacingStyle],
  bottomContainer: [paddingBottom],
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  },
  icon: {
    color: theme.grey,
    paddingTop: 5
  },
  rowCou: {
    flexDirection: 'row',
  },
  couponText: {
    paddingLeft: 8,
    paddingTop: 7
  },
  iconAplied: {
    color: theme.green
  },
  iconNotAplied: {
    color: theme.disabledGrey
  },
  rowAmountCoupon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  remove: {
    paddingRight: 15,
    paddingTop: 7,
    color: theme.red
  }
};
